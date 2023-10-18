import { useEffect, useState } from "react"
import "./AllPostsItem.css"
import { Link, useNavigate } from "react-router-dom"
import { deletePost } from "../../services/postService"

export const AllPostsItem = ({ currentUser, postObj, updateData }) => {

    const [postLikes, setPostLikes] = useState(0)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)

    const navigate = useNavigate()

    const postTopicClassName = "post-topic-item post-topic-" + postObj.postTopicId

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

    useEffect(() => {
        if (currentUser.id === postObj.userId) {
            setUserIsPostOwner(true)
        }
        setPostLikes(calculatePostLikes())
    }, [])

    return (
        <div className="post-container">
            <aside className="post-likes-container">
                <div className="post-likes-item">
                    <button className="post-like-btn">
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
                
                <div className="post-likes-item">{postLikes}</div>
                
                <div className="post-likes-item">
                    <button className="post-dislike-btn">
                        <i className="fa-solid fa-arrow-down"></i>
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