
import { useState } from "react"
import { Link } from "react-router-dom"
import Input from "../atoms/Input"
import Button from "../atoms/Button"
import "./Auth.css"
import CryptoJS from "crypto-js"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [gravatarUrl, setGravatarUrl] = useState("")
  const [githubRepos, setGithubRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const getGravatarUrl = (email) => {
    // Create MD5 hash of the email
    const md5 = (string) => {
      return CryptoJS.MD5(string.trim().toLowerCase()).toString()
    }

    const emailHash = md5(email)
    return `https://www.gravatar.com/avatar/${emailHash}?s=200&d=mp`
  }

  const fetchGithubRepos = async (email) => {
    try {
      // In a real implementation, you would need to search GitHub users by email
      // This is a simplified example
      const response = await fetch(`https://api.github.com/search/users?q=${email}`)
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const username = data.items[0].login
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
        const reposData = await reposResponse.json()
        return reposData
      }

      return []
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
      return []
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter an email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Get Gravatar URL
      const gravatar = getGravatarUrl(email)
      setGravatarUrl(gravatar)

      // Get GitHub repositories
      const repos = await fetchGithubRepos(email)
      setGithubRepos(repos)
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__card">
          <div className="auth__header">
            <h1 className="auth__title">Sign In</h1>
            <p className="auth__subtitle">Enter your email to see your Gravatar and GitHub repos</p>
          </div>

          <form onSubmit={handleSubmit} className="auth__form">
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              error={error}
            />

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>

          {gravatarUrl && (
            <div className="auth__gravatar">
              <h2 className="auth__section-title">Your Gravatar</h2>
              <img src={gravatarUrl || "/placeholder.svg"} alt="Gravatar" className="auth__avatar" />
            </div>
          )}

          {githubRepos.length > 0 && (
            <div className="auth__github">
              <h2 className="auth__section-title">Your GitHub Repositories</h2>
              <ul className="auth__repo-list">
                {githubRepos.map((repo) => (
                  <li key={repo.id} className="auth__repo-item">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="auth__repo-link">
                      {repo.name}
                    </a>
                    <p className="auth__repo-description">{repo.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="auth__footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth__link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
