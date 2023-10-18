import "./AllPosts.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { AllPostsItem } from "./AllPostsItem"
import { useNavigate } from "react-router-dom"

export const AllPosts = ({ allPosts, currentUser, updateData }) => {
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
                </header>

                {/* All Posts List Container */}
                <section className="posts-list">
                    {allPosts.map(postObj => {
                        return (
                            <AllPostsItem currentUser={currentUser} postObj={postObj} updateData={updateData} key={postObj.id}/>
                        )
                    })}
                </section>
            </div>
        </>
    )
}