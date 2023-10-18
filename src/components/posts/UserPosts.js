import { useNavigate, useParams } from "react-router-dom"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { AllPostsItem } from "./AllPostsItem"
import { FilterPostsBTN } from "./FilterPostsBTN"

export const UserPosts = ({ allPosts, currentUser, updateData }) => {
    const [userAccountId, setUserAccountId] = useState(0)
    const [userAccount, setUserAccount] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const id = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setUserAccountId(parseInt(id.userId))
        getUserById(id.userId).then(userObj => {
            setUserAccount(userObj)
        })
    }, [])

    useEffect(() => {
        setUserPosts(allPosts.filter(post => post.userId === userAccountId))
    }, [userAccountId])


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
                    <FilterPostsBTN posts={userPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />
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