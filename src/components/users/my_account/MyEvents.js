import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { AllEventsItem } from "../../events/AllEventsItem"
import { FilterEventsBTN } from "../../events/FilterEventsBTN"

export const MyEvents = ({ myEvents, currentUser, updateData }) => {
    const [filteredEvents, setFilteredEvents] = useState([])
    const navigate = useNavigate()

    return (
        <div className="events-container">
            {/* All Posts Header */}
            <header className="events-header">
                <h1>My Events</h1>
                <button className="btn btn-light create-event-btn" onClick={event => {
                    navigate("/new_event")
                }}>
                    Create Event
                </button>
                <FilterEventsBTN events={myEvents} filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} />

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
                {filteredEvents.length == 0 && (
                    <div className="no-user-posts">
                        <h1>You don't have any upcoming events</h1>
                    </div>
                )} 
            </section>
        </div>
    )
}