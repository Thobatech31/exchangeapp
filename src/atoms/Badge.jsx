import "./Badge.css"

const Badge = ({ children, variant = "default", size = "md", className = "" }) => {
  const badgeClasses = ["badge", `badge--${variant}`, `badge--${size}`, className].filter(Boolean).join(" ")

  return <span className={badgeClasses}>{children}</span>
}

export default Badge
