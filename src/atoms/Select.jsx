import "./Select.css"

const Select = ({
  options,
  value,
  onChange,
  name,
  id,
  label,
  error,
  disabled = false,
  fullWidth = true,
  className = "",
  placeholder = "Select an option",
}) => {
  const selectClasses = [
    "select",
    fullWidth ? "select--full-width" : "",
    error ? "select--error" : "",
    disabled ? "select--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={selectClasses}>
      {label && (
        <label htmlFor={id} className="select__label">
          {label}
        </label>
      )}
      <div className="select__wrapper">
        <select id={id} name={name} value={value} onChange={onChange} disabled={disabled} className="select__field">
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="select__arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      {error && <p className="select__error">{error}</p>}
    </div>
  )
}

export default Select
