
import { useState } from "react"
import Input from "../atoms/Input"
import "./SearchBar.css"

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="search-bar__icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        icon={searchIcon}
        iconPosition="left"
        fullWidth={true}
      />
    </form>
  )
}

export default SearchBar
