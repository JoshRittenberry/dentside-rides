import { useNavigate, useParams } from "react-router-dom"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { getUserById } from "../../../services/userService"
import { AllPostsItem } from "../../posts/AllPostsItem"
import { FilterPostsBTN } from "../../posts/FilterPostsBTN"

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

        if (userAccountId === currentUser.id) {
            navigate("/my_posts")
        }
    }, [userAccountId, allPosts])

    return (
        <div className="posts-container">
            {/* All Posts Header */}
            <header className="posts-header">
                <h1>{userAccount.username}'s Posts</h1>
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
    )
}