import { Outlet, Routes, Route } from "react-router-dom"
import { Home } from "../components/home/Home"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService"
import { getCurrentUser } from "../services/userService"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState(12)
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getCurrentUser().then(userObj => {
            setCurrentUser(userObj)
        })

        getAllPosts().then(array => {
            setAllPosts(array)
        })
    }, [])

    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<Home currentUser={currentUser} />} />
                <Route path="/posts">
                    <Route index element={<AllPosts allPosts={allPosts} currentUser={currentUser} />} />
                    <Route path=":postId" />
                </Route>
            </Route>
        </Routes>
    )
}