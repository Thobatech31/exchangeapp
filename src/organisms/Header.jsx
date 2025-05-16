import { Link, useLocation } from "react-router-dom";
import NavLink from "../molecules/NavLink";
import globeIcon from "../assets/icons/globe.svg";
import signoutIcon from "../assets/icons/signout.svg";
import userIcon from "../assets/icons/user.svg";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import WifiIcon from "../assets/icons/wifi.svg";
import BatteryIcon from "../assets/icons/battery.svg";  
import SignalIcon from "../assets/icons/CellularConnection.svg";
import "./Header.css";

const Header = ({ user }) => {
  const location = useLocation();

  // Mock user for demonstration
  const mockUser = user || { name: "Owolabi Toba" };

  // Get current time for mobile status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="header">
      {/* Status bar for mobile */}
      <div className="header__status-bar">
        <span className="header__status-time">{currentTime}</span>
        <div className="header__status-icons">
          <img src={SignalIcon} alt="Signal" className="header__status-icon" />
          <img src={WifiIcon} alt="Wi-Fi" className="header__status-icon" />
          <img src={BatteryIcon} alt="Battery" className="header__status-icon" />
        </div>
      </div>

      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="header__logo-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <span className="header__logo-text">Sisyphus</span>
            </Link>
          </div>
          <nav className="header__nav">
            <NavLink to="/dashboard" isActive={location.pathname === "/dashboard"}>
              Exchange
            </NavLink>
            <NavLink to="/wallet" isActive={location.pathname === "/wallet"}>
              Wallets
            </NavLink>
            <NavLink to="/markets" isActive={location.pathname === "/markets"}>
              Roqqu Hub
            </NavLink>
          </nav>
        </div>
        <div className="header__right">
          {mockUser ? (
            <div className="header__user-section">
              <div className="header__user-profile">
                <div className="header__user-avatar">
                  <img src={userIcon} alt="User Avatar" className="header__avatar-icon" />
                </div>
                <span className="header__user-name">{mockUser.name}</span>
              </div>
              <button className="header__icon-button">
                <img src={globeIcon} alt="Language settings" className="header__icon" />
              </button>
              <button className="header__icon-button header__icon-button--menu">
                <img src={hamburgerIcon} alt="Menu" className="header__icon header__icon--mobile" />
                <img src={signoutIcon} alt="Sign out" className="header__icon header__icon--desktop" />
              </button>
            </div>
          ) : (
            <div className="header__auth">
              <Link to="/auth" className="header__login-link">
                Log in
              </Link>
              <Link to="/signup" className="header__signup-link">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;