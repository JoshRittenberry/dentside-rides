import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AllEventsItem } from "../../events/AllEventsItem"
import { FilterEventsBTN } from "../../events/FilterEventsBTN"

export const MyEvents = ({ myEvents, myRSVPEvents, currentUser, updateData }) => {
    const [filteredEvents, setFilteredEvents] = useState([])
    const [myRSVPs, setMyRSVPs] = useState([])
    const [hostedToggle, setHostedToggle] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        let myRSVPArray = []
        myRSVPEvents.map(rsvp => {
            myRSVPArray.push(rsvp.event)
        })
        setMyRSVPs(myRSVPArray)
    }, [myEvents, myRSVPEvents, currentUser])

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

                {hostedToggle && (
                    <FilterEventsBTN events={myEvents} setFilteredEvents={setFilteredEvents} hostedToggle={hostedToggle} />
                )}

                {!hostedToggle && (
                    <FilterEventsBTN events={myRSVPs} setFilteredEvents={setFilteredEvents} hostedToggle={hostedToggle} />
                )}

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => {
                        setHostedToggle(!hostedToggle)
                    }}/>
                    <label class="form-check-label" for="flexSwitchCheckDefault">My RSVPs</label>
                </div>

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