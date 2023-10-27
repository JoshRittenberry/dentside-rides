import { useNavigate } from "react-router-dom"
import "./UserSideBar.css"
import { MerchAd } from "./MerchAd"
import { useEffect, useState } from "react"

export const UserSideBar = ({ currentUser }) => {
    const [userJoinYear, setUserJoinYear] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const dateString = "2021-03-05";
        const year = dateString.split("-")[0];
        setUserJoinYear(year)
    }, [currentUser])

    return (
        <div className="usersidebar">
            <div className="usersidebar-picture">
                <img src={currentUser.imageUrl} />
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