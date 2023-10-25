import { Link, useNavigate } from "react-router-dom"
import "./UserSideBar.css"
import { useEffect, useState } from "react"
import { getAllClassifieds } from "../../services/classifiedService"

export const UserSideBar = ({ currentUser }) => {
    const [merch, setMerch] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllClassifieds().then(classifiedsArray => {
            const merchItems = classifiedsArray.filter(classified => classified.itemTypeId === 1)
            setMerch(merchItems)
        })
    }, [])

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
            <div id="merch-carousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="1">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div>
                    {merch.map(merchObj => {
                        return (
                            <div className="carousel-item" data-bs-interval="5000">
                                <img src={merchObj.classifiedImages[0].url} className="d-block w-100" onClick={() => {
                                    navigate(`/classifieds/${merchObj.id}`)
                                }}/>
                            </div>
                        )
                    })}
                </div>
            </div>

            {localStorage.getItem("dentside_user") ? (
                <button
                    className="usersidebar-item btn btn-light"
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
                Member Since: {currentUser.joinDate}
            </div>
        </div>
    )
}