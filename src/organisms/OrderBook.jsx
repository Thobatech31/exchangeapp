import { useEffect, useState } from "react";
import { fetchOrderBook } from "../utils/api";
import "./OrderBook.css";

const OrderBook = ({ selectedPair }) => {
  const [view, setView] = useState("both"); // 'both', 'asks', 'bids'
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });

  // Find the highest volume for scaling
  const allVolumes = [...orderBook.asks, ...orderBook.bids].map((order) => order.volume);
  const maxVolume = Math.max(...allVolumes, 1);

  const renderOrderRow = (order, type, index) => {
    const volumePercentage = (order.volume / maxVolume) * 100;
    const bgClass = type === "ask" ? "order-book__volume-bar--ask" : "order-book__volume-bar--bid";

    return (
      <tr key={`${type}-${order.price}-${index}`} className="order-book__row">
        <td className="order-book__cell order-book__cell--volume">
          <div className="order-book__volume">
            <div className={`order-book__volume-bar ${bgClass}`} style={{ width: `${volumePercentage}%` }} />
            <span className="order-book__volume-text">{order.volume.toFixed(6)}</span>
          </div>
        </td>
        <td className={`order-book__cell order-book__cell--price order-book__cell--${type}`}>
          {order.price.toFixed(6)}
        </td>
        <td className="order-book__cell order-book__cell--total">{order.total.toFixed(2)}</td>
      </tr>
    );
  };

  useEffect(() => {
    const loadOrderBook = async () => {
      if (selectedPair && selectedPair.id) {
        const data = await fetchOrderBook(selectedPair.id); // Use id (e.g., "bitcoin")
        setOrderBook(data);
      }
    };
    loadOrderBook();
  }, [selectedPair]);

  return (
    <div className="order-book">
      <div className="order-book__header">
        <h3 className="order-book__title">Order Book</h3>
        <div className="order-book__view-selector">
          <button
            className={`order-book__view-button ${view === "both" ? "order-book__view-button--active" : ""}`}
            onClick={() => setView("both")}
          >
            Both
          </button>
          <button
            className={`order-book__view-button ${view === "asks" ? "order-book__view-button--active" : ""}`}
            onClick={() => setView("asks")}
          >
            Asks
          </button>
          <button
            className={`order-book__view-button ${view === "bids" ? "order-book__view-button--active" : ""}`}
            onClick={() => setView("bids")}
          >
            Bids
          </button>
        </div>
      </div>
      <div className="order-book__content">
        <table className="order-book__table">
          <thead className="order-book__table-head">
            <tr>
              <th className="order-book__header-cell order-book__header-cell--right">Amount</th>
              <th className="order-book__header-cell order-book__header-cell--right">Price</th>
              <th className="order-book__header-cell order-book__header-cell--right">Total</th>
            </tr>
          </thead>
          <tbody className="order-book__table-body">
            {(view === "asks" || view === "both") && (
              <>
                {orderBook.asks.length > 0 ? (
                  orderBook.asks
                    .slice()
                    .reverse()
                    .map((ask, index) => renderOrderRow(ask, "ask", index))
                ) : (
                  <tr>
                    <td colSpan="3">No asks available</td>
                  </tr>
                )}
              </>
            )}

            {view === "both" && selectedPair && (
              <tr className="order-book__row order-book__row--current-price">
                <td colSpan="3" className="order-book__cell order-book__cell--current-price">
                  ${selectedPair.price}
                </td>
              </tr>
            )}

            {(view === "bids" || view === "both") && (
              <>
                {orderBook.bids.length > 0 ? (
                  orderBook.bids.map((bid, index) => renderOrderRow(bid, "bid", index))
                ) : (
                  <tr>
                    <td colSpan="3">No bids available</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="order-book__actions">
        <button className="order-book__action-button order-book__action-button--buy">Buy</button>
        <button className="order-book__action-button order-book__action-button--sell">Sell</button>
      </div>
    </div>
  );
};

export default OrderBook;