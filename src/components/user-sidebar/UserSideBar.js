import { useNavigate } from "react-router-dom"
import "./UserSideBar.css"

export const UserSideBar = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <div className="usersidebar">
            <div className="usersidebar-picture">
                <img src="https://i.ibb.co/jznVcXy/240-F-516275801-f3-Fsp17x6-HQK0x-Qg-DQEELo-Tu-ERO4-Ss-WV.jpg" />
            </div>
            <h3 className="usersidebar-item">{currentUser.username}</h3>
            <button className="usersidebar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/my_posts")
            }}>
                My Posts
            </button>
            <button className="usersidebar-item btn btn-light">My Account</button>
            {localStorage.getItem("dentside_user") ? (
                <button
                    className="usersidebar-item btn btn-light"
                    onClick={() => {
                        localStorage.removeItem("dentside_user");
                        navigate("/", { replace: true });
                    }}
                >
                    Logout
                </button>
            ) : null}
            <div className="usersidebar-item">
                Member Since: {currentUser.joinDate}
            </div>
        </div>
    )
}