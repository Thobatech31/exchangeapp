
import { useState } from "react"
import SearchBar from "../molecules/SearchBar"
import TradingPairItem from "../molecules/TradingPairItem"
import "./TradingPairs.css"

const TradingPairs = ({ pairs = [], onSelectPair, selectedPair }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredPairs = pairs.filter((pair) =>
    `${pair.baseCurrency}/${pair.quoteCurrency}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="trading-pairs">
      <div className="trading-pairs__header">
        <h3 className="trading-pairs__title">Select Market</h3>
        <SearchBar onSearch={handleSearch} placeholder="Search..." />
      </div>
      <div className="trading-pairs__list">
        {filteredPairs.length > 0 ? (
          filteredPairs.map((pair) => (
            <TradingPairItem
              key={`${pair.baseCurrency}-${pair.quoteCurrency}`}
              baseCurrency={pair.baseCurrency}
              quoteCurrency={pair.quoteCurrency}
              price={pair.price}
              priceChange={pair.priceChange}
              onClick={() => onSelectPair(pair)}
              isSelected={
                selectedPair &&
                selectedPair.baseCurrency === pair.baseCurrency &&
                selectedPair.quoteCurrency === pair.quoteCurrency
              }
            />
          ))
        ) : (
          <div className="trading-pairs__empty">No trading pairs found</div>
        )}
      </div>
    </div>
  )
}

export default TradingPairs
