import { useEffect, useState } from "react"
import "./HomePostsItem.css"
import { Link, useNavigate } from "react-router-dom"
import { deletePost, reactToPost } from "../../services/postService"

export const HomePostsItem = ({ currentUser, postObj, updateData }) => {

    const [postLikes, setPostLikes] = useState(0)
    const [postLikeObj, setPostLikeObj] = useState({})
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)
    const [userHasReacted, setUserHasReacted] = useState(false)

    const navigate = useNavigate()

    const postTopicClassName = "home-post-topic-item home-post-topic-" + postObj.postTopicId

    const calculatePostLikes = () => {
        const likesArray = postObj.postLikes

        let number = 0
        likesArray.map(like => {
            if (like.status) {
                number++
            } else if (!like.status) {
                number--
            }
        })

        return number
    }

    const checkForUserReaction = () => {
        const userReaction = postObj.postLikes.find(postLike => postLike.userId === currentUser.id)
        if (userReaction) {
            setUserHasReacted(true)
            setPostLikeObj(userReaction)
        } else if (!userReaction) {
            setUserHasReacted(false)
            setPostLikeObj({})
        }
    }

    const handlePostLikeIcon = () => {
        if (userHasReacted && postLikeObj.status) {
            return (
                <i className="fa-solid fa-car"></i>
            )
        } else {
            return (
                <i className="fa-solid fa-arrow-up"></i>
            )
        }
    }

    const handlePostDislikeIcon = () => {
        if (userHasReacted && !postLikeObj.status) {
            return (
                <i className="fa-solid fa-car-burst"></i>
            )
        } else {
            return (
                <i className="fa-solid fa-arrow-down"></i>
            )
        }
    }

    useEffect(() => {
        setPostLikes(calculatePostLikes())

        if (currentUser.id === postObj.userId) {
            setUserIsPostOwner(true)
        }

        checkForUserReaction()
    }, [postObj])

    return (
        <Link to={`/posts/${postObj.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="home-post-container">
                <div className="home-post">
                    <div className="home-post-profile-picture-container">
                        <Link to={`/user_account/${postObj.user.id}`}>
                            <img className="home-post-profile-picture" src={postObj.user?.imageUrl} />
                        </Link>
                    </div>

                    <h5 className="home-post-title">{postObj.title}</h5>

                    <div className={postTopicClassName}>{postObj.postTopic.name}</div>

                    <div className="home-post-btn-container">
                        {userIsPostOwner && (
                            <>
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle home-post-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Post Options
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={event => {
                                            event.preventDefault()
                                            navigate(`/edit_post/${postObj.id}`)
                                        }}>
                                            Edit
                                        </a></li>
                                        <li><a className="dropdown-item" onClick={event => {
                                            event.preventDefault()
                                            deletePost(postObj.id).then(() => {
                                                updateData()
                                            })
                                        }}>
                                            Delete
                                        </a></li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="home-post-date">{postObj.postDate}</div>
                </div>
            </div>
        </Link>
    )
}