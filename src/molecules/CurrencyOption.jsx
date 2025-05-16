import "./CurrencyOption.css"

const CurrencyOption = ({ name, code, flag, onClick, isSelected = false }) => {
  const optionClasses = ["currency-option", isSelected ? "currency-option--selected" : ""].filter(Boolean).join(" ")

  return (
    <div onClick={onClick} className={optionClasses}>
      <div className="currency-option__flag">{flag}</div>
      <div className="currency-option__info">
        <div className="currency-option__name">{name}</div>
        <div className="currency-option__code">{code}</div>
      </div>
    </div>
  )
}

export default CurrencyOption
