import { useEffect, useState } from "react"
import "./AllPostsItem.css"

export const AllPostsItem = ({ currentUser, postObj }) => {

    const [postLikes, setPostLikes] = useState(0)
    const [userIsPostOwner, setUserIsPostOwner] = useState(false)

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
                    <div>{postObj.user.username}</div>
                    <div>{postObj.postDate}</div>
                </header>

                <div className="post-info">
                    <h4>{postObj.title}</h4>
                    <div className="post-btn-container">
                        <div className={postTopicClassName}>{postObj.postTopic.name}</div>
                        {userIsPostOwner && (
                            <>
                                <button className="post-btn btn btn-light">Delete</button>
                                <button className="post-btn btn btn-light">Edit</button>
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