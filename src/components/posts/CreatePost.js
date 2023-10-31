import "./CreatePost.css"
import { useEffect, useState } from "react"
import { getAllPostTopics, uploadPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"

export const CreatePost = ({ currentUser, updateData }) => {
    const [postTopics, setPostTopics] = useState([])
    const [postTopicText, setPostTopicText] = useState("Post Topic")
    const [newPost, setNewPost] = useState({
        userId: 0,
        postDate: "",
        postTopicId: 0,
        title: "",
        body: "",
        postDate: "",
    })

    const navigate = useNavigate()

    const setPostTopicDropdownText = () => {
        if (newPost.postTopicId != 0) {
            postTopics.map(postTopic => {
                if (postTopic.id === newPost.postTopicId) {
                    setPostTopicText(postTopic.name)
                }
            })
        }
    }

    const getCurrentDateFormatted = () => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, hence +1 and pad
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        const newPostCopy = { ...newPost }
        newPostCopy.userId = currentUser.id
        newPostCopy.postDate = getCurrentDateFormatted()
        setNewPost(newPostCopy)

        getAllPostTopics().then(postTopicsArray => {
            setPostTopics(postTopicsArray)
        })
    }, [currentUser])

    useEffect(() => {
        setPostTopicDropdownText()
    }, [newPost])

    return (
        <div className="create-post-container">
            <h1>Create Post</h1>
            <form className="create-post-form">
                <section className="create-post-form-top">
                    <fieldset className="create-post-title-container">
                        <input
                            className="create-post-title"
                            type="text"
                            placeholder="Post Title"
                            value={newPost.title}
                            onChange={event => {
                                event.preventDefault()
                                const newPostCopy = { ...newPost }
                                newPostCopy.title = event.target.value
                                setNewPost(newPostCopy)
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
                                            const newPostCopy = { ...newPost }
                                            newPostCopy.postTopicId = parseInt(event.target.id)
                                            setNewPost(newPostCopy)
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
                        value={newPost.body}
                        onChange={event => {
                            event.preventDefault()
                            const newPostCopy = { ...newPost }
                            newPostCopy.body = event.target.value
                            setNewPost(newPostCopy)
                        }}
                    />
                </fieldset>
            </form>
            <div className="create-post-btn-container">
                <button className="create-post-btn btn btn-light" onClick={event => {
                    event.preventDefault()
                    uploadPost(newPost).then(() => {
                        updateData()
                        navigate("/my_posts")
                    })
                }}>
                    Save Post
                </button>
                <button className="create-post-btn-danger btn btn-danger" onClick={() => {
                    navigate("/my_posts")
                }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}