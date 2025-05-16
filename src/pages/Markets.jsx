"use client"

import { useState } from "react"
import Header from "../organisms/Header"
import SearchBar from "../molecules/SearchBar"
import Badge from "../atoms/Badge"
import "./Markets.css"

// Mock data
const mockMarkets = [
  {
    baseCurrency: "BTC",
    quoteCurrency: "USDT",
    price: "56634.20",
    priceChange: 1.25,
    volume: "1,234,567",
    high24h: "57,123.45",
    low24h: "55,678.90",
  },
  {
    baseCurrency: "ETH",
    quoteCurrency: "USDT",
    price: "3245.80",
    priceChange: 0.75,
    volume: "987,654",
    high24h: "3,300.00",
    low24h: "3,200.00",
  },
  {
    baseCurrency: "SOL",
    quoteCurrency: "USDT",
    price: "124.50",
    priceChange: -2.3,
    volume: "456,789",
    high24h: "130.00",
    low24h: "120.00",
  },
  {
    baseCurrency: "BNB",
    quoteCurrency: "USDT",
    price: "456.70",
    priceChange: 0.45,
    volume: "345,678",
    high24h: "460.00",
    low24h: "450.00",
  },
  {
    baseCurrency: "ADA",
    quoteCurrency: "USDT",
    price: "0.45",
    priceChange: -1.2,
    volume: "234,567",
    high24h: "0.47",
    low24h: "0.44",
  },
  {
    baseCurrency: "XRP",
    quoteCurrency: "USDT",
    price: "0.65",
    priceChange: 3.1,
    volume: "123,456",
    high24h: "0.67",
    low24h: "0.62",
  },
]

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredMarkets = mockMarkets.filter((market) => {
    const searchMatch = `${market.baseCurrency}${market.quoteCurrency}`.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return searchMatch
    if (activeTab === "gainers") return searchMatch && market.priceChange > 0
    if (activeTab === "losers") return searchMatch && market.priceChange < 0

    return searchMatch
  })

  return (
    <div className="markets">
      <Header />

      <main className="markets__main">
        <h1 className="markets__title">Markets</h1>

        <div className="markets__container">
          <div className="markets__header">
            <div className="markets__tabs">
              <button
                className={`markets__tab ${activeTab === "all" ? "markets__tab--active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`markets__tab ${activeTab === "gainers" ? "markets__tab--active" : ""}`}
                onClick={() => setActiveTab("gainers")}
              >
                Gainers
              </button>
              <button
                className={`markets__tab ${activeTab === "losers" ? "markets__tab--active" : ""}`}
                onClick={() => setActiveTab("losers")}
              >
                Losers
              </button>
            </div>
            <div className="markets__search">
              <SearchBar onSearch={handleSearch} placeholder="Search markets..." />
            </div>
          </div>

          <div className="markets__table-container">
            <table className="markets__table">
              <thead className="markets__table-head">
                <tr>
                  <th className="markets__header-cell markets__header-cell--left">Market</th>
                  <th className="markets__header-cell markets__header-cell--right">Price</th>
                  <th className="markets__header-cell markets__header-cell--right">24h Change</th>
                  <th className="markets__header-cell markets__header-cell--right">24h High</th>
                  <th className="markets__header-cell markets__header-cell--right">24h Low</th>
                  <th className="markets__header-cell markets__header-cell--right">Volume</th>
                  <th className="markets__header-cell markets__header-cell--right">Actions</th>
                </tr>
              </thead>
              <tbody className="markets__table-body">
                {filteredMarkets.map((market) => (
                  <tr key={`${market.baseCurrency}-${market.quoteCurrency}`} className="markets__row">
                    <td className="markets__cell markets__cell--market">
                      <div className="markets__market-info">
                        <div className="markets__market-icons">
                          <div className="markets__market-icon markets__market-icon--base">
                            {market.baseCurrency.charAt(0)}
                          </div>
                          <div className="markets__market-icon markets__market-icon--quote">
                            {market.quoteCurrency.charAt(0)}
                          </div>
                        </div>
                        <div className="markets__market-details">
                          <div className="markets__market-name">
                            {market.baseCurrency}/{market.quoteCurrency}
                          </div>
                          <div className="markets__market-type">Spot</div>
                        </div>
                      </div>
                    </td>
                    <td className="markets__cell markets__cell--right markets__cell--price">${market.price}</td>
                    <td className="markets__cell markets__cell--right">
                      <Badge variant={market.priceChange >= 0 ? "success" : "danger"}>
                        {market.priceChange >= 0 ? "+" : ""}
                        {market.priceChange}%
                      </Badge>
                    </td>
                    <td className="markets__cell markets__cell--right">${market.high24h}</td>
                    <td className="markets__cell markets__cell--right">${market.low24h}</td>
                    <td className="markets__cell markets__cell--right">${market.volume}</td>
                    <td className="markets__cell markets__cell--right">
                      <a
                        href={`/exchange?pair=${market.baseCurrency}-${market.quoteCurrency}`}
                        className="markets__trade-link"
                      >
                        Trade
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Markets
