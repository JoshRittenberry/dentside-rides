import "./AllEvents.css"
import { useNavigate } from "react-router-dom"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useState } from "react"
import { AllEventsItem } from "./AllEventsItem"
import { FilterEventsBTN } from "./FilterEventsBTN"

export const AllEvents = ({ allEvents, setAllEvents, currentUser, updateData}) => {
    const [filteredEvents, setFilteredEvents] = useState([])
    const navigate = useNavigate()

    return (
            <div className="events-container">
                {/* All Posts Header */}
                <header className="events-header">
                    <h1>Events</h1>
                    <button className="btn btn-light create-event-btn" onClick={event => {
                        navigate("/new_event")
                    }}>
                        Create Event
                    </button>
                    <FilterEventsBTN events={allEvents} filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} />

                    {/* I want this but gawt dang its being a pain in my ass */}
                    {/* <SortPostsBTN allPosts={allPosts} setAllPosts={setAllPosts} /> */}
                </header>

                {/* All Posts List Container */}
                <section className="events-list">
                    {filteredEvents.map(eventObj => {
                        return (
                            <AllEventsItem currentUser={currentUser} eventObj={eventObj} updateData={updateData} key={eventObj.id} />
                        )
                    })}
                </section>
            </div>
    )
}