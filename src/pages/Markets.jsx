
import { useState, useEffect } from "react";
import SearchBar from "../molecules/SearchBar";
import Badge from "../atoms/Badge";
import { fetchMarketData } from "../utils/api";
import "./Markets.css";

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkets = async () => {
      setLoading(true);
      try {
        const data = await fetchMarketData(10, 1); // Fetch top 10 coins
        setMarkets(data);
      } catch (error) {
        console.error("Failed to load market data:", error);
        setMarkets([]);
      } finally {
        setLoading(false);
      }
    };
    loadMarkets();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMarkets = markets.filter((market) => {
    const searchMatch = `${market.baseCurrency}${market.quoteCurrency}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (activeTab === "all") return searchMatch;
    if (activeTab === "gainers") return searchMatch && market.priceChange > 0;
    if (activeTab === "losers") return searchMatch && market.priceChange < 0;

    return searchMatch;
  });

  return (
    <div className="markets">
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
            {loading ? (
              <p>Loading markets...</p>
            ) : markets.length === 0 ? (
              <p>No market data available.</p>
            ) : (
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
                    <tr
                      key={`${market.baseCurrency}-${market.quoteCurrency}`}
                      className="markets__row"
                    >
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
                      <td className="markets__cell markets__cell--right markets__cell--price">
                        ${market.price}
                      </td>
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Markets;