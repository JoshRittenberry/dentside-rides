import { Outlet, Routes, Route, useLocation } from "react-router-dom"
import { Home } from "../components/home/Home"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/navbar/NavBar"
import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService"
import { getAllUsersOnly, getUserById } from "../services/userService"
import { ViewPost } from "../components/posts/ViewPost"
import { CreatePost } from "../components/posts/CreatePost"
import { EditPost } from "../components/posts/EditPost"
import { MyAccount } from "../components/users/my_account/MyAccount"
import { UserAccount } from "../components/users/user_account/UserAccount"
import { UserPosts } from "../components/users/user_account/UserPosts"
import { AllClassifieds } from "../components/classifieds/AllClassifieds"
import { getAllClassifieds } from "../services/classifiedService"
import { CreateClassified } from "../components/classifieds/CreateClassified"
import { ViewClassified } from "../components/classifieds/ViewClassified"
import { EditClassified } from "../components/classifieds/EditClassified"
import { MyPosts } from "../components/users/my_account/MyPosts"
import { MyClassifieds } from "../components/users/my_account/MyClassifieds"
import { UserClassifieds } from "../components/users/user_account/UserClassifieds"
import { AllEvents } from "../components/events/AllEvents"
import { getAllEventRSVPs, getAllEvents } from "../services/eventService"
import { ViewEvent } from "../components/events/ViewEvent"
import { MyEvents } from "../components/users/my_account/MyEvents"
import { UserEvents } from "../components/users/user_account/UserEvents"
import { CreateEvent } from "../components/events/CreateEvent"
import { EditEvent } from "../components/events/EditEvent"
import { UserSideBar } from "../components/user-sidebar/UserSideBar"

export const ApplicationViews = () => {
    const [location, setLocation] = useState("")
    const [showUserSideBar, setShowUserSideBar] = useState(true)
    const [currentUserId, setCurrentUserId] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [searchBarSuggestions, setSearchBarSuggestions] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [allClassifieds, setAllClassifieds] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const [myClassifieds, setMyClassifieds] = useState([])
    const [myEvents, setMyEvents] = useState([])
    const [myRSVPEvents, setMyRSVPEvents] = useState([])

    const {pathname} = useLocation()
    const myAccountString = "/my_account"
    const userAccountString = "/user_account"

    // Exported Function to Update allPosts and myPosts
    const updateData = () => {
        getAllPosts().then(array => {
            const sortedByDateArray = array.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
            setAllPosts(sortedByDateArray)
            setMyPosts(sortedByDateArray.filter(post => post.userId === currentUser.id))
        })

        getAllClassifieds().then(array => {
            const sortedByDateArray = array.sort((a, b) => new Date(b.classifiedDate) - new Date(a.classifiedDate))
            setAllClassifieds(sortedByDateArray)
            setMyClassifieds(sortedByDateArray.filter(classified => classified.userId === currentUser.id))
        })

        getAllEvents().then(array => {
            const sortedByDateArray = array.sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate))
            setAllEvents(sortedByDateArray)
            setMyEvents(sortedByDateArray.filter(event => event.userId === currentUser.id))
        })

        getAllUsersOnly().then(array => {
            setAllUsers(array)
        })

        getAllEventRSVPs().then(rsvps => {
            const filteredRSVPs = rsvps.filter(rsvp => rsvp.userId == currentUserId)
            setMyRSVPEvents(filteredRSVPs)
        })
    }

    useEffect(() => {
        const localDentsideUser = localStorage.getItem("dentside_user")
        const dentsideUserId = JSON.parse(localDentsideUser)

        setCurrentUserId(dentsideUserId.id)

        getUserById(dentsideUserId.id).then(userObj => {
            setCurrentUser(userObj)
        })
    }, [])

    useEffect(() => {
        updateData()
    }, [currentUser])

    useEffect(() => {
        setLocation(pathname)
        if (pathname.toLowerCase().includes(myAccountString.toLowerCase()) || pathname.toLowerCase().includes(userAccountString.toLowerCase())) {
            setShowUserSideBar(false)
        } else {
            setShowUserSideBar(true)
        }
    }, [pathname])

    useEffect(() => {
        let suggestionsArray = []

        if (searchTerm != "") {
            // Set Posts
            const filteredPosts = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            
                filteredPosts.map(post => {
                    suggestionsArray.push(post)
                })
            
            // Set Classifieds
            const filteredClassifieds = allClassifieds.filter(classified =>
                classified.title.toLowerCase().includes(searchTerm.toLowerCase())
            )

                filteredClassifieds.map(classified => {
                    suggestionsArray.push(classified)
                })

            // Set Events
            const filteredEvents = allEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            )

                filteredEvents.map(event => {
                    suggestionsArray.push(event)
                })

            // Set Users
            const filteredUsers = allUsers.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )

                filteredUsers.map(user => {
                    suggestionsArray.push(user)
                })
            
            setSearchBarSuggestions(suggestionsArray)
        } else {
            setSearchBarSuggestions([])
        }
    }, [searchTerm])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchBarSuggestions={searchBarSuggestions} />
                        {showUserSideBar && (
                            <UserSideBar currentUser={currentUser} />
                        )}
                        <Outlet />
                    </>
                }
            >
                
                {/* Home */}
                <Route index element={<Home currentUser={currentUser} allPosts={allPosts} allClassifieds={allClassifieds} allEvents={allEvents} updateData={updateData} />} />
                
                {/* Posts */}
                <Route path="/posts">
                    <Route index element={<AllPosts allPosts={allPosts} setAllPosts={setAllPosts} currentUser={currentUser} updateData={updateData} />} />
                    <Route path=":postId" element={<ViewPost updateData={updateData} />} />
                </Route>
                <Route path="/my_posts" element={<MyPosts myPosts={myPosts} currentUser={currentUser} updateData={updateData} />} />
                <Route path="/user_posts">
                    <Route path=":userId" element={<UserPosts allPosts={allPosts} currentUser={currentUser} updateData={updateData} />} />
                </Route>
                <Route path="/new_post" element={<CreatePost currentUser={currentUser} updateData={updateData} />} />
                <Route path="/edit_post" >
                    <Route path=":postId" element={<EditPost currentUser={currentUser} updateData={updateData} />} />
                </Route>
                
                {/* Classifieds */}
                <Route path="/classifieds">
                    <Route index element={<AllClassifieds allClassifieds={allClassifieds} currentUser={currentUser} updateData={updateData} />} />
                    <Route path=":classifiedId" element={<ViewClassified updateData={updateData} />} />
                </Route>
                <Route path="/my_classifieds" element={<MyClassifieds myClassifieds={myClassifieds} currentUser={currentUser} updateData={updateData} />} />
                <Route path="/user_classifieds">
                    <Route path=":userId" element={<UserClassifieds allClassifieds={allClassifieds} currentUser={currentUser} updateData={updateData} />} />
                </Route>
                <Route path="/new_classified" element={<CreateClassified currentUser={currentUser} allClassifieds={allClassifieds} updateData={updateData} />} />
                <Route path="/edit_classified" >
                    <Route path=":classifiedId" element={<EditClassified currentUser={currentUser} updateData={updateData} />} />
                </Route>

                {/* Events */}
                <Route path="/events">
                    <Route index element={<AllEvents allEvents={allEvents} setAllEvents={setAllEvents} currentUser={currentUser} updateData={updateData} />} />
                    <Route path=":eventId" element={<ViewEvent currentUser={currentUser} updateData={updateData} />} /> 
                </Route>
                <Route path="/my_events" element={<MyEvents myEvents={myEvents} myRSVPEvents={myRSVPEvents} currentUser={currentUser} updateData={updateData} />}/>
                <Route path="/user_events">
                    <Route path=":userId" element={<UserEvents allEvents={allEvents} currentUser={currentUser} updateData={updateData} />} />
                </Route>
                <Route path="/new_event" element={<CreateEvent currentUser={currentUser} allEvents={allEvents} updateData={updateData} />} />
                <Route path="/edit_event" >
                    <Route path=":eventId" element={<EditEvent currentUser={currentUser} updateData={updateData} />} />
                </Route>

                {/* Accounts */}
                <Route path="/my_account" element={<MyAccount currentUser={currentUser} />} />
                <Route path="/user_account" >
                    <Route path=":userId" element={<UserAccount currentUser={currentUser} />} />
                </Route>

            </Route>
        </Routes>
    )
}