import "./AllPosts.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { AllPostsItem } from "./AllPostsItem"

export const AllPosts = ({ allPosts, currentUser }) => {
    return (
        <main>
            <UserSideBar currentUser={currentUser} />
            <div className="posts-container">
                {/* All Posts Header */}
                <header className="posts-header">
                    <h1>Posts</h1>
                    <button className="btn btn-light">Create Post</button>
                </header>

                {/* All Posts List Container */}
                <section className="posts-list">
                    {allPosts.map(postObj => {
                        return (
                            <AllPostsItem currentUser={currentUser} postObj={postObj} key={postObj.id}/>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}