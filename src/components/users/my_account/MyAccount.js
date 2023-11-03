import { useNavigate } from "react-router-dom"
import "./MyAccount.css"
import { UserScore } from "../UserScore"

export const MyAccount = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <div className="view-account">
            <h1 className="account-name">{currentUser.username}</h1>
            <UserScore userAccount={currentUser} />
            <div className="account-container">
                <div className="account-picture-container">
                    <img src={currentUser.imageUrl} />
                </div>

                <div className="account-info">
                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate("/my_posts")
                    }}>
                        My Posts
                    </button>

                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate("/my_classifieds")
                    }}>
                        My Classifieds
                    </button>

                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate("/my_events")
                    }}>
                        My Events
                    </button>

                    {localStorage.getItem("dentside_user") ? (
                        <button
                            className="account-item btn btn-danger"
                            onClick={event => {
                                event.preventDefault()
                                localStorage.removeItem("dentside_user");
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </button>
                    ) : null}
                    <div className="account-item">
                        Member Since: {currentUser.joinDate}
                    </div>
                </div>
            </div>
        </div>
    )
}