import "./CreateEvent.css"
import { useEffect, useState } from "react"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useNavigate, useParams } from "react-router-dom"
import { getAllEventTypes, getEventOnlyById, uploadEventChanges } from "../../services/eventService"

export const EditEvent = ({ currentUser, allEvents, updateData }) => {
    const [eventTypes, setEventTypes] = useState([])
    const [eventTypeText, setEventTypeText] = useState("Set Event Type")
    const [newEvent, setNewEvent] = useState({
        "userId": 0,
        "eventStartDate": "",
        "eventEndDate": "",
        "eventTypeId": 0,
        "multiDayEvent": false,
        "title": "",
        "body": "",
        "location": "",
        "eventImageUrl": ""
    })

    const navigate = useNavigate()
    const eventId = useParams()

    const setEventItemDropdownText = () => {
        if (newEvent.eventTypeId != 0) {
            eventTypes.map(eventType => {
                if (eventType.id === newEvent.eventTypeId) {
                    setEventTypeText(eventType.name)
                }
            })
        }
    }

    useEffect(() => {
        getEventOnlyById(eventId.eventId).then(eventObj => {
            if (currentUser.id === eventObj.userId) {
                setNewEvent(eventObj)
            } else {
                navigate("/my_events")
            }
        })

        getAllEventTypes().then(eventTypesArray => {
            setEventTypes(eventTypesArray)
        })
    }, [currentUser])

    useEffect(() => {
        setEventItemDropdownText()
    }, [newEvent])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="create-event-container">
                <h1>Create Event</h1>
                <div className="create-event-flex-container">

                    {/* Event Details on the left */}
                    <form className="create-event-form">
                        <section className="create-event-form-header">
                            <input
                                className="create-event-title"
                                type="text"
                                placeholder="Event Title"
                                value={newEvent.title}
                                onChange={event => {
                                    event.preventDefault()
                                    const newEventCopy = { ...newEvent }
                                    newEventCopy.title = event.target.value
                                    setNewEvent(newEventCopy)
                                }}
                            />

                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {eventTypeText}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {eventTypes.map(eventType => {
                                        return (
                                            <li key={eventType.id}><a className="dropdown-item" id={eventType.id} onClick={event => {
                                                event.preventDefault()
                                                const newEventCopy = { ...newEvent }
                                                newEventCopy.eventTypeId = parseInt(event.target.id)
                                                setNewEvent(newEventCopy)
                                            }}>
                                                {eventType.name}
                                            </a></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>

                        <input
                            className="create-event-location"
                            type="text"
                            placeholder="Event Location"
                            value={newEvent.location}
                            onChange={event => {
                                event.preventDefault()
                                const newEventCopy = { ...newEvent }
                                newEventCopy.location = event.target.value
                                setNewEvent(newEventCopy)
                            }}
                        />

                        <textarea
                            className="create-event-body"
                            type="text"
                            placeholder="Event Body"
                            value={newEvent.body}
                            onChange={event => {
                                event.preventDefault()
                                const newEventCopy = { ...newEvent }
                                newEventCopy.body = event.target.value
                                setNewEvent(newEventCopy)
                            }}
                        />

                        <input
                            className="create-event-start"
                            type="datetime-local"
                            placeholder="Event Start"
                            value={newEvent.eventStartDate}
                            onChange={event => {
                                event.preventDefault()
                                const newEventCopy = { ...newEvent }
                                newEventCopy.eventStartDate = event.target.value
                                setNewEvent(newEventCopy)
                            }}
                        />

                        <input
                            className="create-event-end"
                            type="datetime-local"
                            placeholder="Event End"
                            value={newEvent.eventEndDate}
                            onChange={event => {
                                event.preventDefault()
                                if (new Date(event.target.value) < new Date(newEvent.eventStartDate)) {
                                    alert("Please select an Event End Date that is after the Event Start Date")
                                } else if (newEvent.eventStartDate == "") {
                                    alert("Please select an Event Start Date before selecting an Event End Date")
                                } else {
                                    const newEventCopy = { ...newEvent }
                                    newEventCopy.eventEndDate = event.target.value
                                    setNewEvent(newEventCopy)
                                }
                            }}
                        />

                    </form>

                    {/* Event Pictures on the right */}
                    <form className="create-event-form">
                        <h1>Event Image</h1>

                        <section className="create-event-image-container">
                            {newEvent.eventImageUrl && (
                                <img className="create-event-image" src={newEvent.eventImageUrl} />
                            )}
                            {!newEvent.eventImageUrl && (
                                <img className="create-event-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png" />
                            )}
                        </section>

                        <input
                            className="create-event-picture-url"
                            type="url"
                            placeholder="Event Picture URL"
                            value={newEvent.eventImageUrl}
                            onChange={event => {
                                event.preventDefault()
                                const newEventCopy = { ...newEvent }
                                newEventCopy.eventImageUrl = event.target.value
                                setNewEvent(newEventCopy)
                            }}
                        />
                    </form>
                </div>

                {/* Buttons on the bottom */}
                <div className="create-event-btn-container">
                    <button className="create-event-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        if (newEvent.eventStartDate == "" || newEvent.eventEndDate == "") {
                            alert("Please select an Event Start and End Date")
                        } else {
                            uploadEventChanges(newEvent).then(() => {
                                updateData()
                                navigate("/my_events")
                            })
                        }
                    }}>
                        Save Classified
                    </button>
                    <button className="create-event-btn-danger btn btn-danger" onClick={() => {
                        navigate("/my_events")
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}