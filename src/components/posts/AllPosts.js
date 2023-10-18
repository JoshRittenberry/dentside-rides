import "./AllPosts.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { AllPostsItem } from "./AllPostsItem"
import { useNavigate } from "react-router-dom"
import { FilterPostsBTN } from "./FilterPostsBTN"
import { useState } from "react"

export const AllPosts = ({ allPosts, currentUser, updateData }) => {
    const [filteredPosts, setFilteredPosts] = useState([])
    const navigate = useNavigate()

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="posts-container">
                {/* All Posts Header */}
                <header className="posts-header">
                    <h1>Posts</h1>
                    <button className="btn btn-light" onClick={event => {
                        navigate("/new_post")
                    }}>
                        Create Post
                    </button>
                    <FilterPostsBTN posts={allPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>
                </header>

                {/* All Posts List Container */}
                <section className="posts-list">
                    {filteredPosts.map(postObj => {
                        return (
                            <AllPostsItem currentUser={currentUser} postObj={postObj} updateData={updateData} key={postObj.id}/>
                        )
                    })}
                </section>
            </div>
        </>
    )
}