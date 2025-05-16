import "./TimeframeSelector.css"

const TimeframeSelector = ({
  timeframes = ["1m", "5m", "15m", "1h", "4h", "1d", "1w", "1M"],
  selectedTimeframe,
  onSelectTimeframe,
}) => {
  return (
    <div className="timeframe-selector">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          className={`timeframe-selector__button ${
            selectedTimeframe === timeframe ? "timeframe-selector__button--active" : ""
          }`}
          onClick={() => onSelectTimeframe(timeframe)}
        >
          {timeframe}
        </button>
      ))}
    </div>
  )
}

export default TimeframeSelector
