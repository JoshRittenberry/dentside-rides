import { useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png" />
            </div>

            {/* Home Button */}
            <button className="navbar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/")
            }}>Home</button>

            {/* All Posts */}
            <button className="navbar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/posts")
            }}>
                Posts
            </button>

            {/* All Classifieds */}
            <button className="navbar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/classifieds")
            }}>
                Classifieds
            </button>

            {/* All Events */}
            <button className="navbar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/events")
            }}>
                Events
            </button>
        </nav>
    )
}