import { Outlet, Routes, Route } from "react-router-dom"
import { Home } from "../components/home/Home"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService"
import { getCurrentUser } from "../services/userService"
import { MyPosts } from "../components/posts/MyPosts"
import { ViewPost } from "../components/posts/ViewPost"
import { CreatePost } from "../components/posts/CreatePost"
import { EditPost } from "../components/posts/EditPost"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allPosts, setAllPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])

    // Exported Function to Update allPosts and myPosts
    const updateData = () => {
        getAllPosts().then(array => {
            setAllPosts(array)
            setMyPosts(array.filter(post => post.userId === currentUser.id))
        })
    }

    useEffect(() => {
        getCurrentUser().then(userObj => {
            setCurrentUser(userObj)
        })
    }, [])

    useEffect(() => {
        getAllPosts().then(array => {
            setAllPosts(array)
            setMyPosts(array.filter(post => post.userId === currentUser.id))
        })
    }, [currentUser])

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
                    <Route index element={<AllPosts allPosts={allPosts} currentUser={currentUser} updateData={updateData} />} />
                    <Route path=":postId" element={<ViewPost />} />
                </Route>
                <Route path="/my_posts" element={<MyPosts myPosts={myPosts} currentUser={currentUser} updateData={updateData} />} />
                <Route path="/new_post" element={<CreatePost currentUser={currentUser} updateData={updateData} />} />
                <Route path="/edit_post" >
                    <Route path=":postId" element={<EditPost currentUser={currentUser} updateData={updateData} />} />
                </Route>
            </Route>
        </Routes>
    )
}