import { useNavigate } from "react-router-dom"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { AllPostsItem } from "../../posts/AllPostsItem"
import { useState } from "react"
import { FilterPostsBTN } from "../../posts/FilterPostsBTN"

export const MyPosts = ({ myPosts, currentUser, updateData }) => {
    const [filteredPosts, setFilteredPosts] = useState([])
    const navigate = useNavigate()

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="posts-container">
                {/* All Posts Header */}
                <header className="posts-header">
                    <h1>My Posts</h1>
                    <button className="btn btn-light" onClick={event => {
                        navigate("/new_post")
                    }}>
                        Create Post
                    </button>
                    <FilterPostsBTN posts={myPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
                </header>

                {/* All Posts List Container */}
                <section className="posts-list">
                    {filteredPosts.map(postObj => {
                        return (
                            <AllPostsItem currentUser={currentUser} postObj={postObj} updateData={updateData} key={postObj.id} />
                        )
                    })}
                </section>
            </div>
        </>
    )
}