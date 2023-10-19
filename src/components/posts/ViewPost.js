import "./ViewPost.css"
import { useEffect, useState } from "react"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { getUserById } from "../../services/userService"
import { Link, useParams } from "react-router-dom"
import { getPostById, reactToPost } from "../../services/postService"
import { eventWrapper } from "@testing-library/user-event/dist/utils"

export const ViewPost = ({ updateData }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [post, setPost] = useState({})
    const [postLikes, setPostLikes] = useState(0)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)

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

    const postAuthorButtons = () => {
        if (currentUser.id === post.userId) {
            return (
                <div>
                    <button className="view-post-btn btn btn-light">Edit</button>
                    <button className="view-post-btn btn btn-light">Delete</button>
                </div>
            )
        }
    }

    useEffect(() => {
        getUserById().then(userObj => {
            setCurrentUser(userObj)
        })

        // I'm not sure why, but it is making me do this to properly use the param
        getPostById(postId.postId).then(postObj => {
            setPost(postObj)
            setPostLikes(calculatePostLikes(postObj.postLikes))
        })
    }, [post])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
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
                                <i className="fa-solid fa-arrow-up"></i>
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
                                <i className="fa-solid fa-arrow-down"></i>
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
                            <Link to={`/user_account/${post.user?.id}`}>
                                <div>{post.user?.username}</div>
                            </Link>
                            <div>{post.postDate}</div>
                        </div>
                    </div>
                </header>

                <section className="view-post-body-container">
                    <div className="view-post-body">{post.body}</div>
                </section>
            </div>
        </>
    )
}