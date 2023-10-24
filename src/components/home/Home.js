import "./Home.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { HomePostsItem } from "./HomePostsItem"
import { useEffect, useState } from "react"
import { HomeClassifiedItem } from "./HomeClassifiedItem"
import { HomeEventItem } from "./HomeEventItem"

export const Home = ({ currentUser, allPosts, allClassifieds, allEvents, updateData }) => {
    const [newestPosts, setNewestPosts] = useState([])
    const [newestClassifieds, setNewestClassifieds] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])

    const getNewestPosts = () => {
        const sortedPosts = allPosts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate))
        const newestFourPosts = sortedPosts.slice(0, 4)
        setNewestPosts(newestFourPosts)
    }

    const getNewestClassifieds = () => {
        const sortedClassifieds = allClassifieds.sort((a, b) => new Date(b.classifiedDate) - new Date(a.classifiedDate))
        const newestTwoClassifieds = sortedClassifieds.slice(0, 2)
        setNewestClassifieds(newestTwoClassifieds)
    }

    const getUpcomingEvents = () => {
        const sortedEvents = allEvents.sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate))
        const upcomingFourEvents = sortedEvents.slice(0, 5)
        setUpcomingEvents(upcomingFourEvents)
    }
    
    useEffect(() => {
        getNewestPosts()
        getNewestClassifieds()
        getUpcomingEvents()
    }, [currentUser, allPosts, allClassifieds, allEvents])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="home-container">
                <section className="home-posts-list">
                    <h2>Newest Posts</h2>
                    {newestPosts.map(postObj => {
                        return (
                            <HomePostsItem currentUser={currentUser} postObj={postObj} updateData={updateData} key={postObj.id} />
                        )
                    })}
                </section>
                <section className="home-bottom">
                    <div className="home-classifieds-container">
                        <h2>Newest Classifieds</h2>
                        <div className="home-classifieds-list">
                            {newestClassifieds.map(classifiedObj => {
                                return (
                                    <HomeClassifiedItem currentUser={currentUser} classifiedObj={classifiedObj} updateData={updateData} key={classifiedObj.id} />
                                )
                            })}
                        </div>
                    </div>
                    <div className="home-events-container">
                        <h2>Upcoming Events</h2>
                        <div className="home-events-list">
                            {upcomingEvents.map(eventObj => {
                                return (
                                    <HomeEventItem currentUser={currentUser} eventObj={eventObj} updateData={updateData} key={eventObj.id} />
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}