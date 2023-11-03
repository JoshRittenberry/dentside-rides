import { Link, useNavigate } from "react-router-dom"
import "./UserSideBar.css"
import { MerchAd } from "./MerchAd"
import { useEffect, useState } from "react"
import { UserScore } from "../users/UserScore"

export const UserSideBar = ({ currentUser }) => {
    const [userJoinYear, setUserJoinYear] = useState("")
    const navigate = useNavigate()

    const Tooltip = ({ children, text }) => {
        const [visible, setVisible] = useState(false);

        return (
            <div style={{ position: 'relative' }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
                {visible && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#333',
                        color: 'white',
                        zIndex: 10,
                        marginTop: '4px'
                    }}>
                        {text}
                    </div>
                )}
            </div>
        );
    }

    useEffect(() => {
        const dateString = "2021-03-05";
        const year = dateString.split("-")[0];
        setUserJoinYear(year)
    }, [currentUser])

    return (
        <div className="usersidebar">
            <div className="usersidebar-picture">
                <Tooltip text={currentUser.username}>
                    <Link to="/my_account">
                        <img src={currentUser.imageUrl} />
                    </Link>
                </Tooltip>
            </div>
            <div className="usersidebar-item">
                <UserScore userAccount={currentUser} />
            </div>
            <h3 className="usersidebar-item">{currentUser.username}</h3>
            <button className="usersidebar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/my_posts")
            }}>
                My Posts
            </button>
            <button className="usersidebar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/my_classifieds")
            }}>
                My Classifieds
            </button>
            <button className="usersidebar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/my_events")
            }}>
                My Events
            </button>
            <button className="usersidebar-item btn btn-light" onClick={event => {
                event.preventDefault()
                navigate("/my_account")
            }}>
                My Account
            </button>

            {/* Trying out a MERCH Ad */}
            <MerchAd />

            {localStorage.getItem("dentside_user") ? (
                <button
                    className="usersidebar-item btn btn-danger"
                    onClick={event => {
                        event.preventDefault()
                        localStorage.removeItem("dentside_user");
                        navigate("/", { replace: true });
                    }}
                >
                    Logout
                </button>
            ) : null}
            <div className="usersidebar-item">
                Member Since: {userJoinYear}
            </div>
        </div>
    )
}