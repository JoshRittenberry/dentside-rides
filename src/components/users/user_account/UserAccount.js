import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserById } from "../../../services/userService"

export const UserAccount = ({ currentUser }) => {
    const [userAccountId, setUserAccountId] = useState(0)
    const [userAccount, setUserAccount] = useState({})

    const id = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setUserAccountId(parseInt(id.userId))
        getUserById(id.userId).then(userObj => {
            setUserAccount(userObj)
        })
    }, [])

    useEffect(() => {
        if (userAccount.id == currentUser.id) {
            navigate("/my_account")
        }
    }, [userAccount])

    return (
        <div className="view-account">
            <h1 className="account-name">{userAccount.username}</h1>
            <div className="account-container">
                <div className="account-picture-container">
                    <img src={userAccount.imageUrl} />
                </div>

                <div className="account-info">
                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate(`/user_posts/${userAccountId}`)
                    }}>
                        {userAccount.username}'s Posts
                    </button>

                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate(`/user_classifieds/${userAccountId}`)
                    }}>
                        {userAccount.username}'s Classifieds
                    </button>

                    <button className="account-item btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate(`/user_events/${userAccountId}`)
                    }}>
                        {userAccount.username}'s Events
                    </button>

                    <div className="account-item">
                        Member Since: {userAccount.joinDate}
                    </div>
                </div>

            </div>

        </div>
    )
}