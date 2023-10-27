import "./ViewPost.css"
import { useEffect, useState } from "react"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { getUserById } from "../../services/userService"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostById, reactToPost } from "../../services/postService"

export const ViewPost = ({ updateData }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [post, setPost] = useState({})
    const [postLikes, setPostLikes] = useState(0)
    const [postLikeObj, setPostLikeObj] = useState({})
    const [userHasReacted, setUserHasReacted] = useState(false)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)

    const navigate = useNavigate()
    const postId = useParams()
    let postTopicClassName = "post-topic-item post-topic-" + post.postTopicId

    const authorProfilePicture = () => {
        if (post.user?.imageUrl != "") {
            return post.user?.imageUrl
        } else {
            return `https://i.ibb.co/jznVcXy/240-F-516275801-f3-Fsp17x6-HQK0x-Qg-DQEELo-Tu-ERO4-Ss-WV.jpg`
        }
    }

    const calculatePostLikes = (postLikes) => {
        let number = 0
        postLikes.map(like => {
            if (like.status) {
                number++
            } else if (!like.status) {
                number--
            }
        })

        return number
    }

    const checkForUserReaction = () => {
        const userReaction = post.postLikes?.find(postLike => postLike.userId === currentUser.id)
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

    const postAuthorButtons = () => {
        if (currentUser.id === post.userId) {
            return (
                <div className="view-post-btn-container">
                    <button className="view-post-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate(`/edit_post/${post.id}`)
                    }}>Edit</button>
                    <button className="view-post-btn-danger btn btn-danger" onClick={event => {
                        event.preventDefault()
                        navigate(`/my_posts`)
                        deletePost(post.id).then(() => {
                            updateData()
                        })
                    }}>Delete</button>
                </div>
            )
        }
    }

    const formatDate = (postDate) => {
        const date = new Date(postDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }


    useEffect(() => {
        const localDentsideUser = localStorage.getItem("dentside_user")
        const dentsideUserId = JSON.parse(localDentsideUser)

        getUserById(dentsideUserId.id).then(userObj => {
            setCurrentUser(userObj)
        })

        // I'm not sure why, but it is making me do this to properly use the param
        getPostById(postId.postId).then(postObj => {
            setPost(postObj)
            setPostLikes(calculatePostLikes(postObj.postLikes))
        })

        checkForUserReaction()
    }, [post])

    return (
        <div className="view-post-container">
            <header className="view-post-header">
                <aside className="view-post-likes-container">
                    <div className="view-post-likes-item">
                        <button className="post-like-btn" onClick={event => {
                            event.preventDefault()
                            reactToPost(currentUser.id, post.id, post.postLikes, true).then(() => {
                                updateData()
                            })
                        }}>
                            {handlePostLikeIcon()}
                        </button>
                    </div>

                    <div className="view-post-likes-item">{postLikes}</div>

                    <div className="view-post-likes-item">
                        <button className="post-dislike-btn" onClick={event => {
                            event.preventDefault()
                            reactToPost(currentUser.id, post.id, post.postLikes, false).then(() => {
                                updateData()
                            })
                        }}>
                            {handlePostDislikeIcon()}
                        </button>
                    </div>
                </aside>

                {/* Author Profile Picture */}
                <Link to={`/user_account/${post.user?.id}`}>
                    <div className="view-post-profile-picture">
                        <img src={authorProfilePicture()} />
                    </div>
                </Link>
                <div className="view-post-header-text">
                    <div className="view-post-header-text-top">
                        <h1 className="view-post-title">{post.title}</h1>
                        {postAuthorButtons()}
                    </div>
                    <div className={postTopicClassName}>{post.postTopic?.name}</div>
                    <div className="view-post-info">
                        <Link to={`/user_account/${post.user?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div className="view-post-author-profile">{post.user?.username}</div>
                        </Link>
                        <div>{formatDate(post.postDate)}</div>
                    </div>
                </div>
            </header>

            <section className="view-post-body-container">
                <div className="view-post-body">{post.body}</div>
            </section>
        </div>
    )
}