import { Link } from "react-router-dom"
import "./NavLink.css"

const NavLink = ({ to, children, isActive = false, icon, onClick, className = "" }) => {
  const navLinkClasses = ["nav-link", isActive ? "nav-link--active" : "", className].filter(Boolean).join(" ")

  return (
    <Link to={to} onClick={onClick} className={navLinkClasses}>
      {icon && <span className="nav-link__icon">{icon}</span>}
      {children}
    </Link>
  )
}

export default NavLink
