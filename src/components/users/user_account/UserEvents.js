import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { AllEventsItem } from "../../events/AllEventsItem"
import { getUserById } from "../../../services/userService"

export const UserEvents = ({ allEvents, currentUser, updateData }) => {
    const [userAccountId, setUserAccountId] = useState(0)
    const [userAccount, setUserAccount] = useState({})
    const [userEvents, setUserEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    
    const id = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setUserAccountId(parseInt(id.userId))
        getUserById(id.userId).then(userObj => {
            setUserAccount(userObj)
        })
    }, [])

    useEffect(() => {
        setUserEvents(allEvents.filter(event => event.userId === userAccountId))

        if (userAccountId === currentUser.id) {
            navigate("/my_events")
        }
    }, [userAccountId, allEvents])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="events-container">
                {/* All Events Header */}
                <header className="events-header">
                    <h1>Events</h1>
                    <button className="btn btn-light" onClick={event => {
                        navigate("/new_event")
                    }}>
                        Create Event
                    </button>
                    {/* <FilterEventsBTN events={allEvents} filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} /> */}

                    {/* I want this but gawt dang its being a pain in my ass */}
                    {/* <SortEventsBTN allEvents={allEvents} setAllEvents={setAllEvents} /> */}
                </header>

                {/* All Events List Container */}
                <section className="events-list">
                    {userEvents.map(eventObj => {
                        return (
                            <AllEventsItem currentUser={currentUser} eventObj={eventObj} updateData={updateData} key={eventObj.id} />
                        )
                    })}
                </section>
            </div>
        </>
    )
}