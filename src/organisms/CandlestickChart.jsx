import { useState, useEffect, useRef } from "react";
import "./CandlestickChart.css";
import { fetchCandlestickData } from "../utils/api";

const CandlestickChart = ({ pair, timeframe = "1h", height = 400 }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height });
  const [data, setData] = useState([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [height]);

  useEffect(() => {
    const loadCandlestickData = async () => {
      if (pair && pair.id) {
        try {
          // Map timeframe to days
          let days;
          switch (timeframe) {
            case "1m":
            case "5m":
            case "15m":
              days = "1";
              break;
            case "1h":
              days = "7";
              break;
            case "4h":
            case "1d":
              days = "30";
              break;
            case "1w":
            case "1M":
              days = "max";
              break;
            default:
              days = "1";
          }
          const data = await fetchCandlestickData(pair.id, days);
          console.log("Candlestick Data:", data); // Debugging log
          setData(data);
        } catch (error) {
          console.error("Error fetching candlestick data:", error);
        }
      }
    };
    loadCandlestickData();
  }, [pair, timeframe]);

  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = "#0f1623"; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find min and max values
    const prices = data.flatMap((candle) => [candle.high, candle.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

    // Calculate scaling factors
    const xScale = canvas.width / data.length;
    const yScale = (canvas.height - 40) / priceRange; // Leave space for time labels

    // Draw grid lines
    ctx.strokeStyle = "#1f2937"; // Grid line color
    ctx.lineWidth = 0.5;

    // Horizontal grid lines (price levels)
    const numHorizontalLines = 5;
    for (let i = 0; i <= numHorizontalLines; i++) {
      const y = 10 + (canvas.height - 40 - 20) * (i / numHorizontalLines);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();

      // Price labels
      const price = maxPrice - (i / numHorizontalLines) * priceRange;
      ctx.fillStyle = "#9CA3AF"; // Label color
      ctx.font = "10px Arial";
      ctx.textAlign = "right";
      ctx.fillText(price.toFixed(2), canvas.width - 5, y - 5);
    }

    // Vertical grid lines (time)
    const numVerticalLines = Math.min(data.length, 10);
    for (let i = 0; i <= numVerticalLines; i++) {
      const x = (canvas.width * i) / numVerticalLines;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height - 30);
      ctx.stroke();

      // Time labels
      if (i < numVerticalLines) {
        const dataIndex = Math.floor((data.length - 1) * (i / numVerticalLines));
        const time = new Date(data[dataIndex].timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        ctx.fillStyle = "#9CA3AF"; // Label color
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(time, x, canvas.height - 15);
      }
    }

    // Draw candlesticks
    data.forEach((candle, i) => {
      const x = i * xScale;
      const open = canvas.height - 30 - (candle.open - minPrice) * yScale;
      const close = canvas.height - 30 - (candle.close - minPrice) * yScale;
      const high = canvas.height - 30 - (candle.high - minPrice) * yScale;
      const low = canvas.height - 30 - (candle.low - minPrice) * yScale;

      // Determine if candle is up or down
      const isUp = candle.close > candle.open;

      // Draw candle body
      ctx.fillStyle = isUp ? "#00C076" : "#EF4444"; // Green for up, red for down
      const candleHeight = Math.abs(close - open);
      ctx.fillRect(x + xScale * 0.2, Math.min(open, close), xScale * 0.6, candleHeight || 1); // Ensure minimum height

      // Draw candle wicks
      ctx.strokeStyle = isUp ? "#00C076" : "#EF4444";
      ctx.lineWidth = 1;

      // Top wick
      ctx.beginPath();
      ctx.moveTo(x + xScale * 0.5, Math.min(open, close));
      ctx.lineTo(x + xScale * 0.5, high);
      ctx.stroke();

      // Bottom wick
      ctx.beginPath();
      ctx.moveTo(x + xScale * 0.5, Math.max(open, close));
      ctx.lineTo(x + xScale * 0.5, low);
      ctx.stroke();
    });
  }, [data, dimensions, pair]);

  return (
    <div className="candlestick-chart">
      <div className="candlestick-chart__canvas-container">
        <canvas ref={canvasRef} className="candlestick-chart__canvas" />
      </div>
    </div>
  );
};

export default CandlestickChart;