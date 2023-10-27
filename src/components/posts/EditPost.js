import "./CreatePost.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { getAllPostTopics, getPostOnlyById, uploadPostChanges } from "../../services/postService"
import { useNavigate, useParams } from "react-router-dom"

export const EditPost = ({ currentUser, updateData }) => {
    const [postTopics, setPostTopics] = useState([])
    const [postTopicText, setPostTopicText] = useState("Post Topic")
    const [post, setPost] = useState({})

    const postId = useParams()

    const navigate = useNavigate()

    const setPostTopicDropdownText = () => {
        if (post.postTopicId != 0) {
            postTopics.map(postTopic => {
                if (postTopic.id === post.postTopicId) {
                    setPostTopicText(postTopic.name)
                }
            })
        }
    }

    useEffect(() => {
        getAllPostTopics().then(postTopicsArray => {
            setPostTopics(postTopicsArray)
        })

        getPostOnlyById(postId.postId).then(postObj => {
            setPost(postObj)
            if (postObj.userId != currentUser.id) {
                navigate("/my_posts")
            }
        })
    }, [currentUser])

    useEffect(() => {
        setPostTopicDropdownText()
    }, [post])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="create-post-container">
                <h1>Edit Post</h1>
                <form className="create-post-form">
                    <section className="create-post-form-top">
                        <fieldset className="create-post-title-container">
                            <input
                                className="create-post-title"
                                type="text"
                                placeholder="Post Title"
                                value={post.title}
                                onChange={event => {
                                    event.preventDefault()
                                    const postCopy = { ...post }
                                    postCopy.title = event.target.value
                                    setPost(postCopy)
                                }}
                            />
                        </fieldset>
                        <fieldset className="create-post-topic-container">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {postTopicText}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {postTopics.map(postTopic => {
                                        return (
                                            <li key={postTopic.id}><a className="dropdown-item" id={postTopic.id} onClick={event => {
                                                event.preventDefault()
                                                const postCopy = { ...post }
                                                postCopy.postTopicId = parseInt(event.target.id)
                                                setPost(postCopy)
                                            }}>
                                                {postTopic.name}
                                            </a></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </fieldset>
                    </section>

                    <fieldset className="create-post-body-container">
                        <textarea
                            className="create-post-body"
                            type="text"
                            placeholder="Post Body"
                            value={post.body}
                            onChange={event => {
                                event.preventDefault()
                                const postCopy = { ...post }
                                postCopy.body = event.target.value
                                setPost(postCopy)
                            }}
                        />
                    </fieldset>
                </form>
                <div className="create-post-btn-container">
                    <button className="create-post-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        uploadPostChanges(post).then(() => {
                            updateData()
                            navigate("/my_posts")
                        })
                    }}>
                        Save Changes
                    </button>
                    <button className="create-post-btn-danger btn btn-danger" onClick={() => {
                        navigate("/my_posts")
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}