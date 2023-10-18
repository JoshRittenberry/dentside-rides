import { useEffect, useState } from "react"
import { getAllPostTopics } from "../../services/postService"

export const FilterPostsBTN = ({ posts, filteredPosts, setFilteredPosts }) => {
    const [postTopics, setPostTopics] = useState([])
    const [filter, setFilter] = useState(0)
    const [buttonText, setButtonText] = useState("Filter Posts by Topic")

    const setDropdownButtonText = () => {
        const chosenFilter = postTopics?.find(topic => topic.id === filter)
        if (chosenFilter) {
            setButtonText(chosenFilter.name)
        } else {
            setButtonText("Filter Posts by Topic")
        }
    }

    useEffect(() => {
        getAllPostTopics().then(postTopicsArray => {
            setPostTopics(postTopicsArray)
        })
    }, [])

    useEffect(() => {
        console.log("hello")
        setDropdownButtonText()
        if (filter > 0) {
            setFilteredPosts(posts.filter(post => post.postTopicId === filter))
        } else if (filter === 0) {
            setFilteredPosts(posts)
        }
    }, [filter])

    return (

        <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {buttonText}
            </button>
            <ul className="dropdown-menu dropdown-menu">
                <li><a className="dropdown-item" id="0" onClick={event => {
                    setFilter(parseInt(event.target.id))
                }}>
                    All Posts
                </a></li>

                {postTopics.map(topic => {
                    return (
                        <li key={topic.id}><a className="dropdown-item" id={topic.id} onClick={event => {
                            setFilter(parseInt(event.target.id))
                        }}>
                            {topic.name}
                        </a></li>
                    )
                })}

            </ul>
        </div>
    )
}