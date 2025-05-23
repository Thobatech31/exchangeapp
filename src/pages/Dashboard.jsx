import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faChartLine, faList, faHistory, faExchangeAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CandlestickChart from "../organisms/CandlestickChart";
import OrderBook from "../organisms/OrderBook";
import OrderForm from "../organisms/OrderForm";
import TradingPairs from "../organisms/TradingPairs";
import GroupTokenIcon from "../assets/icons/GroupTokenIcon.svg";
import caretDownIcon from "../assets/icons/caretDown.svg";
import { fetchTradingPairs, fetchCandlestickData } from "../utils/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [candleData, setCandleData] = useState([]);
  const [showMarketSelector, setShowMarketSelector] = useState(false);
  const [balance, setBalance] = useState({ base: 0.5, quote: 10000 });
  const [timeframe, setTimeframe] = useState("1h");
  const [activeTab, setActiveTab] = useState("open-orders");

  useEffect(() => {
    const loadPairs = async () => {
      const fetchedPairs = await fetchTradingPairs();
      setPairs(fetchedPairs);
      if (fetchedPairs.length > 0) {
        setSelectedPair(fetchedPairs[0]);
      }
    };
    loadPairs();
  }, []);

  useEffect(() => {
    const loadCandlestickData = async () => {
      if (selectedPair && selectedPair.id) {
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
        const data = await fetchCandlestickData(selectedPair.id, days);
        setCandleData(data);
      }
    };
    loadCandlestickData();
  }, [selectedPair, timeframe]);

  const handleSelectPair = (pair) => {
    setSelectedPair(pair);
    setShowMarketSelector(false);
  };

  if (!selectedPair) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__market-info">
        <div className="dashboard__pair-selector">
          <div className="dashboard__pair-info">
            <div className="dashboard__pair-icons">
              <img src={GroupTokenIcon} alt="pair-icon" className="groupicon" />
            </div>
            <button onClick={() => setShowMarketSelector(!showMarketSelector)} className="dashboard__pair-button">
              <span className="dashboard__pair-name">
                {selectedPair.baseCurrency}/{selectedPair.quoteCurrency}
              </span>
              <FontAwesomeIcon icon={faExchangeAlt} className="dashboard__pair-arrow dashboard__pair-arrow--desktop" />
              <img src={caretDownIcon} className="dashboard__pair-arrow dashboard__pair-arrow--mobile" />
            </button>
            <div className="dashboard__price-container">
              <div className="dashboard__price">${selectedPair.price}</div>
            </div>
          </div>

          <div className="dashboard__price-stats">
            <div className="dashboard__stats">
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h change</span>
                <span className="dashboard__stat-value">
                  <FontAwesomeIcon
                    icon={selectedPair.priceChange >= 0 ? faArrowUp : faArrowDown}
                    className={selectedPair.priceChange >= 0 ? "dashboard__price-change--up" : "dashboard__price-change--down"}
                  />
                  ${(
                    (Number.parseFloat(selectedPair.price) * Number.parseFloat(selectedPair.priceChange)) /
                    100
                  ).toFixed(2)} {selectedPair.priceChange >= 0 ? "+" : ""}
                  {selectedPair.priceChange}%
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h high</span>
                <span className="dashboard__stat-value">
                  <FontAwesomeIcon icon={faChartLine} /> ${(Number.parseFloat(selectedPair.price) * 1.02).toFixed(2)}
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h low</span>
                <span className="dashboard__stat-value">
                  <FontAwesomeIcon icon={faChartLine} /> ${(Number.parseFloat(selectedPair.price) * 0.98).toFixed(2)}
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h volume</span>
                <span className="dashboard__stat-value">
                  <FontAwesomeIcon icon={faList} /> 75,655.26
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        {showMarketSelector && (
          <div className="dashboard__sidebar">
            <TradingPairs onSelectPair={handleSelectPair} selectedPair={selectedPair} />
          </div>
        )}

        <div className={`dashboard__main-content ${showMarketSelector ? "dashboard__main-content--with-sidebar" : ""}`}>
          <div className="dashboard__timeframe-row">
            <div className="dashboard__timeframe-selector">
              <button
                className={`dashboard__timeframe-button ${timeframe === "1m" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("1m")}
              >
                1m
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "5m" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("5m")}
              >
                5m
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "15m" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("15m")}
              >
                15m
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "1h" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("1h")}
              >
                1h
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "4h" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("4h")}
              >
                4h
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "1d" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("1d")}
              >
                1d
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "1w" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("1w")}
              >
                1w
              </button>
              <button
                className={`dashboard__timeframe-button ${timeframe === "1M" ? "dashboard__timeframe-button--active" : ""}`}
                onClick={() => setTimeframe("1M")}
              >
                1M
              </button>
            </div>
          </div>

          <div className="dashboard__trading-interface">
            <div className="dashboard__chart-orderbook-group">
              <div className="dashboard__chart-area">
                <CandlestickChart pair={selectedPair} timeframe={timeframe} />
              </div>
              <div className="dashboard__orderbook">
                <OrderBook selectedPair={selectedPair} />
              </div>
            </div>
            <div className="dashboard__orderform">
              <OrderForm pair={selectedPair} balance={balance} />
            </div>
          </div>

          <div className="dashboard__orders">
            <div className="dashboard__orders-tabs">
              <button
                className={`dashboard__orders-tab ${activeTab === "open-orders" ? "dashboard__orders-tab--active" : ""}`}
                onClick={() => setActiveTab("open-orders")}
              >
                Open Orders
              </button>
              <button
                className={`dashboard__orders-tab ${activeTab === "positions" ? "dashboard__orders-tab--active" : ""}`}
                onClick={() => setActiveTab("positions")}
              >
                Positions
              </button>
              <button
                className={`dashboard__orders-tab ${activeTab === "order-history" ? "dashboard__orders-tab--active" : ""}`}
                onClick={() => setActiveTab("order-history")}
              >
                Order History
              </button>
              <button
                className={`dashboard__orders-tab ${activeTab === "trade-history" ? "dashboard__orders-tab--active" : ""}`}
                onClick={() => setActiveTab("trade-history")}
              >
                Trade History
              </button>
            </div>

            <div className="dashboard__orders-content">
              {activeTab === "open-orders" && (
                <div className="dashboard__no-orders">
                  <h3>No Open Orders</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.</p>
                  <div className="dashboard__pagination">
                    <span>1 / 15</span>
                  </div>
                </div>
              )}
              {activeTab === "positions" && (
                <div className="dashboard__no-orders">
                  <h3>No Positions</h3>
                  <p>You don't have any open positions at the moment.</p>
                  <div className="dashboard__pagination">
                    <span>1 / 15</span>
                  </div>
                </div>
              )}
              {activeTab === "order-history" && (
                <div className="dashboard__no-orders">
                  <h3>No Order History</h3>
                  <p>Your order history will appear here.</p>
                  <div className="dashboard__pagination">
                    <span>1 / 15</span>
                  </div>
                </div>
              )}
              {activeTab === "trade-history" && (
                <div className="dashboard__no-orders">
                  <h3>No Trade History</h3>
                  <p>Your trade history will appear here.</p>
                  <div className="dashboard__pagination">
                    <span>1 / 15</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;