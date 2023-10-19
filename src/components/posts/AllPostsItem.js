import { useEffect, useState } from "react"
import "./AllPostsItem.css"
import { Link, useNavigate } from "react-router-dom"
import { deletePost, reactToPost } from "../../services/postService"

export const AllPostsItem = ({ currentUser, postObj, updateData }) => {

    const [postLikes, setPostLikes] = useState(0)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)
    const [userHasReacted, setUserHasReacted] = useState(false)

    const navigate = useNavigate()

    const postTopicClassName = "post-topic-item post-topic-" + postObj.postTopicId
    let postLikeIcon = <i className="fa-solid fa-arrow-up"></i>
    let postDislikeIcon = <i className="fa-solid fa-arrow-down"></i>

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
            if (userReaction.status) {
                postLikeIcon = <i class="fa-solid fa-car"></i>
            } else if (!userReaction.status) {
                postDislikeIcon = <i class="fa-solid fa-car-burst"></i>
            }
        } else {
            setUserHasReacted(false)
        }
    }

    // const handlePostLikeIcon = () => {
    //     if (userHasReacted) {
    //         return (
    //             <i class="fa-solid fa-car"></i>
    //         )
    //     } else {
    //         return (
    //             <i className="fa-solid fa-arrow-up"></i>
    //         )
    //     }
    // }

    // const handlePostDislikeIcon = () => {
    //     if (userHasReacted) {
    //         return (
    //             <i class="fa-solid fa-car-burst"></i>
    //         )
    //     } else {
    //         return (
    //             <i className="fa-solid fa-arrow-down"></i>
    //         )
    //     }
    // }

    useEffect(() => {
        setPostLikes(calculatePostLikes())
        
        if (currentUser.id === postObj.userId) {
            setUserIsPostOwner(true)
        }

        checkForUserReaction()
    }, [postObj])

    return (
        <div className="post-container">
            <aside className="post-likes-container">
                <div className="post-likes-item">
                    <button className="post-like-btn" onClick={event => {
                        event.preventDefault()
                        reactToPost(currentUser.id, postObj.id, postObj.postLikes, true).then(() => {
                            updateData()
                        })
                    }}>
                        {postLikeIcon}
                    </button>
                </div>
                
                <div className="post-likes-item">{postLikes}</div>
                
                <div className="post-likes-item">
                    <button className="post-dislike-btn" onClick={event => {
                        event.preventDefault()
                        reactToPost(currentUser.id, postObj.id, postObj.postLikes, false).then(() => {
                            updateData()
                        })
                    }}>
                        {postDislikeIcon}
                    </button>
                </div>
            </aside>

            <div className="post">
                <header className="post-header">
                    <Link to={`/user_account/${postObj.user.id}`}>
                        <div>{postObj.user.username}</div>
                    </Link>
                    <div>{postObj.postDate}</div>
                </header>

                <div className="post-info">
                    <Link to={`/posts/${postObj.id}`}>
                        <h4>{postObj.title}</h4>
                    </Link>
                    <div className="post-btn-container">
                        <div className={postTopicClassName}>{postObj.postTopic.name}</div>
                        {userIsPostOwner && (
                            <>
                                <button className="post-btn btn btn-light" onClick={event => {
                                    event.preventDefault()
                                    deletePost(postObj.id).then(() => {
                                        updateData()
                                    })
                                }}>
                                    Delete
                                </button>
                                <button className="post-btn btn btn-light" onClick={event => {
                                    event.preventDefault()
                                    navigate(`/edit_post/${postObj.id}`)
                                }}>
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="post-body">
                    {postObj.body}
                </div>
            </div>

        </div>
    )
}