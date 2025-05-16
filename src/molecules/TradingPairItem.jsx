import "./TradingPairItem.css"

const TradingPairItem = ({ baseCurrency, quoteCurrency, price, priceChange, onClick, isSelected = false }) => {
  const isPriceUp = priceChange >= 0

  const itemClasses = ["trading-pair-item", isSelected ? "trading-pair-item--selected" : ""].filter(Boolean).join(" ")

  return (
    <div onClick={onClick} className={itemClasses}>
      <div className="trading-pair-item__currencies">
        <div className="trading-pair-item__icons">
          <div className="trading-pair-item__icon trading-pair-item__icon--base">{baseCurrency.charAt(0)}</div>
          <div className="trading-pair-item__icon trading-pair-item__icon--quote">{quoteCurrency.charAt(0)}</div>
        </div>
        <span className="trading-pair-item__name">
          {baseCurrency}/{quoteCurrency}
        </span>
      </div>
      <div className="trading-pair-item__price-info">
        <div className="trading-pair-item__price">{price}</div>
        <div
          className={`trading-pair-item__change ${isPriceUp ? "trading-pair-item__change--up" : "trading-pair-item__change--down"}`}
        >
          {isPriceUp ? "+" : ""}
          {priceChange}%
        </div>
      </div>
    </div>
  )
}

export default TradingPairItem
