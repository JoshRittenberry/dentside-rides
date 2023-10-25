import { useNavigate } from "react-router-dom"
import "./MyAccount.css"

export const MyAccount = ({ currentUser }) => {
    const navigate = useNavigate()

    return (
        <>
            <h1 className="account-name">{currentUser.username}</h1>
            <div className="account-container">
                <div className="account-picture">
                    <img src={currentUser.imageUrl} />
                </div>

                <div className="account-info">
                    <h3 className="account-item">{currentUser.username}</h3>
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

        </>
    )
}