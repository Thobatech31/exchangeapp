import "./Input.css"

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  label,
  error,
  disabled = false,
  fullWidth = true,
  icon,
  iconPosition = "left",
  className = "",
}) => {
  const inputWrapperClasses = [
    "input",
    fullWidth ? "input--full-width" : "",
    error ? "input--error" : "",
    disabled ? "input--disabled" : "",
    icon ? `input--with-icon input--icon-${iconPosition}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}
      <div className="input__wrapper">
        {icon && iconPosition === "left" && <div className="input__icon input__icon--left">{icon}</div>}
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="input__field"
        />
        {icon && iconPosition === "right" && <div className="input__icon input__icon--right">{icon}</div>}
      </div>
      {error && <p className="input__error">{error}</p>}
    </div>
  )
}

export default Input
