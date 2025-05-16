
import { useState, useEffect } from "react"
import "./OrderForm.css"

const OrderForm = ({ pair, balance = { base: 0, quote: 0 } }) => {
  const [orderType, setOrderType] = useState("limit") // 'limit', 'market', 'stop-limit'
  const [side, setSide] = useState("buy") // 'buy', 'sell'
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("")
  const [timeInForce, setTimeInForce] = useState("gtc") // 'gtc', 'fok', 'gtd'
  const [postOnly, setPostOnly] = useState(false)
  const [currency, setCurrency] = useState("NGN")

  // Calculate total when price or amount changes
  useEffect(() => {
    if (price && amount) {
      setTotal((Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(2))
    } else {
      setTotal("")
    }
  }, [price, amount])

  // Update amount when total changes
  const handleTotalChange = (e) => {
    const newTotal = e.target.value
    setTotal(newTotal)

    if (newTotal && price) {
      setAmount((Number.parseFloat(newTotal) / Number.parseFloat(price)).toFixed(6))
    } else {
      setAmount("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle order submission
    console.log({
      pair,
      orderType,
      side,
      price: Number.parseFloat(price),
      amount: Number.parseFloat(amount),
      total: Number.parseFloat(total),
      timeInForce,
      postOnly,
    })
  }

  const timeInForceOptions = [
    { value: "gtc", label: "Good til cancelled" },
    { value: "fok", label: "Fill or kill" },
    { value: "gtd", label: "Good til date" },
  ]

  return (
    <div className="order-form">
      <div className="order-form__content">
        {/* Buy/Sell tabs */}
        <div className="order-form__tabs order-form__actions">
          <button
            className={`order-form__tab order-form__tab--buy ${side === "buy" ? "order-form__tab--active" : ""}`}
            onClick={() => setSide("buy")}
          >
            Buy
          </button>
          <button
            className={`order-form__tab order-form__tab--sell ${side === "sell" ? "order-form__tab--active" : ""}`}
            onClick={() => setSide("sell")}
          >
            Sell
          </button>
        </div>

        {/* Order type tabs */}
        <div className="order-form__type-selector">
          <button
            className={`order-form__type-button ${orderType === "limit" ? "order-form__type-button--active" : ""}`}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </button>
          <button
            className={`order-form__type-button ${orderType === "market" ? "order-form__type-button--active" : ""}`}
            onClick={() => setOrderType("market")}
          >
            Market
          </button>
          <button
            className={`order-form__type-button ${orderType === "stop-limit" ? "order-form__type-button--active" : ""}`}
            onClick={() => setOrderType("stop-limit")}
          >
            Stop-Limit
          </button>
        </div>

        <form onSubmit={handleSubmit} className="order-form__form">
          {/* Limit price field */}
          {orderType !== "market" && (
            <div className="order-form__field">
              <div className="order-form__field-header">
                <label className="order-form__label">
                  Limit price
                  <span className="order-form__info-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8H12.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
                <div className="order-form__currency-label">USD</div>
              </div>
              <div className="order-form__input-container">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="order-form__input"
                />
              </div>
            </div>
          )}

          {/* Amount field */}
          <div className="order-form__field">
            <div className="order-form__field-header">
              <label className="order-form__label">
                Amount
                <span className="order-form__info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
              <div className="order-form__currency-label">USD</div>
            </div>
            <div className="order-form__input-container">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="order-form__input"
              />
            </div>
          </div>

          {/* Type (Time in force) field */}
          <div className="order-form__field">
            <div className="order-form__field-header">
              <label className="order-form__label">
                Type
                <span className="order-form__info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
            </div>
            <div className="order-form__select-container">
              <select
                value={timeInForce}
                onChange={(e) => setTimeInForce(e.target.value)}
                className="order-form__select"
              >
                <option value="gtc">Good till cancelled</option>
                <option value="fok">Fill or kill</option>
                <option value="gtd">Good till date</option>
              </select>
              <div className="order-form__select-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Post Only checkbox */}
          <div className="order-form__checkbox-field">
            <label className="order-form__checkbox-container">
              <input
                type="checkbox"
                checked={postOnly}
                onChange={(e) => setPostOnly(e.target.checked)}
                className="order-form__checkbox-input"
              />
              <span className="order-form__checkbox-custom"></span>
            </label>
            <span className="order-form__checkbox-label">
              Post Only
              <span className="order-form__info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>

          {/* Total */}
          <div className="order-form__total">
            <span className="order-form__total-label">Total</span>
            <span className="order-form__total-value">0.00</span>
          </div>

          {/* Submit button */}
          <button type="submit" className="order-form__submit-button">
            {side === "buy" ? "Buy" : "Sell"} {pair?.baseCurrency || "BTC"}
          </button>
        </form>

        {/* Account information */}
        <div className="order-form__account-info">
          <div className="order-form__divider"></div>

          <div className="order-form__account-row">
            <div className="order-form__account-label">
              Total account value
              <div className="order-form__currency-selector">
                {currency}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="order-form__account-value">0.00</div>
          </div>

          <div className="order-form__balance-row">
            <div className="order-form__balance-item">
              <div className="order-form__balance-label">Open Orders</div>
              <div className="order-form__balance-value">0.00</div>
            </div>
            <div className="order-form__balance-item">
              <div className="order-form__balance-label">Available</div>
              <div className="order-form__balance-value">0.00</div>
            </div>
          </div>

          <button className="order-form__deposit-button">Deposit</button>
        </div>
      </div>
    </div>
  )
}

export default OrderForm
