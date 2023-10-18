import { useEffect, useState } from "react"

export const SortPostsBTN = ({ allPosts, setAllPosts }) => {
    const [sortOption, setSortOption] = useState(0)
    const [sortOptionText, setOptionText] = useState("Sort Posts")

    useEffect(() => {
        if (sortOption == 4) {
            const sortedPostsArray = allPosts.sort((a, b) => b.postLikes.length - a.postLikes.length)
            setAllPosts(sortedPostsArray)
        }
    }, [allPosts, sortOption])

    return (
        <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {sortOptionText}
            </button>
            <ul className="dropdown-menu dropdown-menu">
                <li><a className="dropdown-item" id="1" onClick={event => {
                    setSortOption(parseInt(event.target.id))
                    setOptionText(event.target.innerText)
                }}>
                    Newest to Oldest
                </a></li>
                <li><a className="dropdown-item" id="2" onClick={event => {
                    setSortOption(parseInt(event.target.id))
                    setOptionText(event.target.innerText)
                }}>
                    Oldest to Newest
                </a></li>
                <li><a className="dropdown-item" id="3" onClick={event => {
                    setSortOption(parseInt(event.target.id))
                    setOptionText(event.target.innerText)
                }}>
                    Least Reactions
                </a></li>
                <li><a className="dropdown-item" id="4" onClick={event => {
                    setSortOption(parseInt(event.target.id))
                    setOptionText(event.target.innerText)
                }}>
                    Most Reactions
                </a></li>
            </ul>
        </div>
    )
}