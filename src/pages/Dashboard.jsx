
import { useState, useEffect } from "react"
import CandlestickChart from "../organisms/CandlestickChart"
import OrderBook from "../organisms/OrderBook"
import OrderForm from "../organisms/OrderForm"
import TradingPairs from "../organisms/TradingPairs"
import "./Dashboard.css"

// Mock data
const mockPairs = [
  { baseCurrency: "BTC", quoteCurrency: "USDT", price: "56634.20", priceChange: 1.25 },
  { baseCurrency: "ETH", quoteCurrency: "USDT", price: "3245.80", priceChange: 0.75 },
  { baseCurrency: "SOL", quoteCurrency: "USDT", price: "124.50", priceChange: -2.3 },
  { baseCurrency: "BNB", quoteCurrency: "USDT", price: "456.70", priceChange: 0.45 },
  { baseCurrency: "ADA", quoteCurrency: "USDT", price: "0.45", priceChange: -1.2 },
  { baseCurrency: "XRP", quoteCurrency: "USDT", price: "0.65", priceChange: 3.1 },
]

const generateMockCandles = (pair, count = 100) => {
  const basePrice = Number.parseFloat(pair.price)
  const volatility = basePrice * 0.02 // 2% volatility

  const candles = []
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(Date.now() - (count - i) * 3600000).getTime()
    const open = i === 0 ? basePrice : candles[i - 1].close
    const close = open * (1 + (Math.random() * volatility * 2 - volatility) / basePrice)
    const high = Math.max(open, close) * (1 + Math.random() * 0.005)
    const low = Math.min(open, close) * (1 - Math.random() * 0.005)
    const volume = basePrice * Math.random() * 10

    candles.push({ timestamp, open, high, low, close, volume })
  }

  return candles
}

const generateMockOrders = (pair, count = 15) => {
  const basePrice = Number.parseFloat(pair.price)
  const asks = []
  const bids = []

  for (let i = 0; i < count; i++) {
    const askPrice = basePrice * (1 + 0.0001 * (i + 1))
    const bidPrice = basePrice * (1 - 0.0001 * (i + 1))

    const askVolume = Math.random() * 2
    const bidVolume = Math.random() * 2

    asks.push({
      price: askPrice,
      volume: askVolume,
      total: askPrice * askVolume,
    })

    bids.push({
      price: bidPrice,
      volume: bidVolume,
      total: bidPrice * bidVolume,
    })
  }

  return { asks, bids }
}

const Dashboard = () => {
  const [selectedPair, setSelectedPair] = useState(mockPairs[0])
  const [candleData, setCandleData] = useState([])
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] })
  const [showMarketSelector, setShowMarketSelector] = useState(false)
  const [balance, setBalance] = useState({ base: 0.5, quote: 10000 })
  const [timeframe, setTimeframe] = useState("1h")
  const [activeTab, setActiveTab] = useState("open-orders")

  useEffect(() => {
    if (selectedPair) {
      const candles = generateMockCandles(selectedPair)
      setCandleData(candles)
      setOrderBook(generateMockOrders(selectedPair))
    }
  }, [selectedPair])

  const handleSelectPair = (pair) => {
    setSelectedPair(pair)
    setShowMarketSelector(false)
  }

  return (
    <div className="dashboard">
      <div className="dashboard__market-info">
        <div className="dashboard__pair-selector">
          <div className="dashboard__pair-info">
            <div className="dashboard__pair-icons">
              <div className="dashboard__pair-icon dashboard__pair-icon--base">
                {selectedPair.baseCurrency.charAt(0)}
              </div>
              <div className="dashboard__pair-icon dashboard__pair-icon--quote">
                {selectedPair.quoteCurrency.charAt(0)}
              </div>
            </div>
            <button onClick={() => setShowMarketSelector(!showMarketSelector)} className="dashboard__pair-button">
              <span className="dashboard__pair-name">
                {selectedPair.baseCurrency}/{selectedPair.quoteCurrency}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="dashboard__pair-arrow"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="dashboard__price-stats">
            <div className="dashboard__price-container">
              <div className="dashboard__price">${selectedPair.price}</div>
              <div
                className={`dashboard__price-change ${Number.parseFloat(selectedPair.priceChange) >= 0 ? "dashboard__price-change--up" : "dashboard__price-change--down"}`}
              >
                {Number.parseFloat(selectedPair.priceChange) >= 0 ? "+" : ""}
                {selectedPair.priceChange}%
              </div>
            </div>

            <div className="dashboard__stats">
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h change</span>
                <span className="dashboard__stat-value">
                  $
                  {(
                    (Number.parseFloat(selectedPair.price) * Number.parseFloat(selectedPair.priceChange)) /
                    100
                  ).toFixed(2)}{" "}
                  +{selectedPair.priceChange}%
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h high</span>
                <span className="dashboard__stat-value">
                  ${(Number.parseFloat(selectedPair.price) * 1.02).toFixed(2)} +{selectedPair.priceChange}%
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h low</span>
                <span className="dashboard__stat-value">
                  ${(Number.parseFloat(selectedPair.price) * 0.98).toFixed(2)} +{selectedPair.priceChange}%
                </span>
              </div>
              <div className="dashboard__stat">
                <span className="dashboard__stat-label">24h volume</span>
                <span className="dashboard__stat-value">75,655.26</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        {showMarketSelector && (
          <div className="dashboard__sidebar">
            <TradingPairs pairs={mockPairs} onSelectPair={handleSelectPair} selectedPair={selectedPair} />
          </div>
        )}

        <div className={`dashboard__main-content ${showMarketSelector ? "dashboard__main-content--with-sidebar" : ""}`}>
          {/* Timeframe selector */}
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

          {/* Main trading interface */}
       <div className="dashboard__trading-interface">
  <div className="dashboard__chart-orderbook-group">
    <div className="dashboard__chart-area">
      <CandlestickChart pair={selectedPair} data={candleData} />
    </div>
    <div className="dashboard__orderbook">
      <OrderBook asks={orderBook.asks} bids={orderBook.bids} selectedPair={selectedPair} />
    </div>
  </div>
  <div className="dashboard__orderform">
    <OrderForm pair={selectedPair} balance={balance} />
  </div>
</div>

          {/* Order history tabs */}
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.
                  </p>
                </div>
              )}
              {activeTab === "positions" && (
                <div className="dashboard__no-orders">
                  <h3>No Positions</h3>
                  <p>You don't have any open positions at the moment.</p>
                </div>
              )}
              {activeTab === "order-history" && (
                <div className="dashboard__no-orders">
                  <h3>No Order History</h3>
                  <p>Your order history will appear here.</p>
                </div>
              )}
              {activeTab === "trade-history" && (
                <div className="dashboard__no-orders">
                  <h3>No Trade History</h3>
                  <p>Your trade history will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
