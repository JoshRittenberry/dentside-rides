import { Link, useLocation, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { SearchBar } from "./SearchBar"

export const NavBar = ({ searchTerm, setSearchTerm, searchBarSuggestions }) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const isActive = (button) => {
        if (pathname === button) {
            return (
                `navbar-btn-active`
            )
        } else {
            return
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png" />
                </Link>
            </div>

            {/* Home Button */}
            <button className={`navbar-item btn btn-light ${isActive("/")}`} onClick={event => {
                event.preventDefault()
                navigate("/")
            }}>Home</button>

            {/* All Posts */}
            <button className={`navbar-item btn btn-light ${isActive("/posts")}`} onClick={event => {
                event.preventDefault()
                navigate("/posts")
            }}>
                Posts
            </button>

            {/* All Classifieds */}
            <button className={`navbar-item btn btn-light ${isActive("/classifieds")}`} onClick={event => {
                event.preventDefault()
                navigate("/classifieds")
            }}>
                Classifieds
            </button>

            {/* All Events */}
            <button className={`navbar-item btn btn-light ${isActive("/events")}`} onClick={event => {
                event.preventDefault()
                navigate("/events")
            }}>
                Events
            </button>

            {/* Search Bar */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchBarSuggestions={searchBarSuggestions} />
        </nav>
    )
}