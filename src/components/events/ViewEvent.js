import "./ViewEvent.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { deleteEvent, getEventById } from "../../services/eventService"

export const ViewEvent = ({ currentUser, updateData }) => {
    const [event, setEvent] = useState({})

    const eventId = useParams()
    const navigate = useNavigate()
    let eventTypeName = "event-type-item event-type-" + event.eventTypeId

    const authorProfilePicture = () => {
        if (event.user?.imageUrl != "") {
            return event.user?.imageUrl
        } else {
            return `https://i.ibb.co/jznVcXy/240-F-516275801-f3-Fsp17x6-HQK0x-Qg-DQEELo-Tu-ERO4-Ss-WV.jpg`
        }
    }

    const eventAuthorButtons = () => {
        if (currentUser.id === event.userId) {
            return (
                <div className="view-event-btn-container">
                    <button className="view-event-btn btn btn-light" onClick={() => {
                        navigate(`/edit_event/${event.id}`)
                    }}>
                        Edit
                    </button>

                    <button className="view-event-btn-danger btn btn-danger" onClick={() => {
                        deleteEvent(event.id).then(() => {
                            updateData()
                            navigate("/my_events")
                        })
                    }}>
                        Delete
                    </button>
                </div>
            )
        }
    }

    useEffect(() => {
        getEventById(eventId.eventId).then(eventObj => {
            setEvent(eventObj)
        })
    }, [])

    return (
        <div className="view-event-container">
            <header className="view-event-header">
                {/* Author Profile Picture */}
                <Link to={`/user_account/${event.user?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div className="view-event-profile-picture">
                        <img src={authorProfilePicture()} />
                    </div>
                </Link>
                <div className="view-event-header-text">
                    <div className="view-event-header-text-top">
                        <h1 className="view-event-title">{event.title}</h1>
                        {eventAuthorButtons()}
                    </div>
                    <div className="view-event-location">{event.location}</div>
                    <div className="view-event-info">
                        <Link to={`/user_account/${event.user?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div className="view-event-author-profile">{event.user?.username}</div>
                        </Link>
                        <div>{event.eventDate}</div>
                    </div>
                </div>
            </header>

            <section className="view-event-body-container">
                <div className="view-event-body">{event.body}</div>

                <section className="view-event-image-container">
                    <img className="view-event-image" src={event.eventImageUrl} />
                </section>
            </section>

        </div>
    )
}