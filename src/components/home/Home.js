import "./Home.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { HomePostsItem } from "./HomePostsItem"
import { useEffect, useState } from "react"

export const Home = ({ currentUser, allPosts, allClassifieds, updateData }) => {
    const [newestPosts, setNewestPosts] = useState([])
    const [newestClassifieds, setNewestClassifieds] = useState([])

    const getNewestPosts = () => {
        const sortedPosts = allPosts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        const newestFourPosts = sortedPosts.slice(0, 4)
        setNewestPosts(newestFourPosts)
    }

    const getNewestClassifieds = () => {

    }
    
    useEffect(() => {
        getNewestPosts()
    }, [currentUser, allPosts, allClassifieds])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <section className="home-posts-list">
                {newestPosts.map(postObj => {
                    return (
                        <HomePostsItem currentUser={currentUser} postObj={postObj} updateData={updateData} key={postObj.id} />
                    )
                })}
            </section>
            <section className="home-bottom">
                
            </section>
        </>
    )
}