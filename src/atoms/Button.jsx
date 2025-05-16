import "./Button.css"

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}) => {
  const buttonClasses = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? "button--full-width" : "",
    disabled ? "button--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
