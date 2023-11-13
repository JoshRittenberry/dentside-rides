import "./ViewEvent.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { deleteEvent, getEventById, createEventRSVP, deleteEventRSVP } from "../../services/eventService"
import { ViewEventRSVP } from "./ViewEventRSVP"

export const ViewEvent = ({ currentUser, updateData }) => {
    const [event, setEvent] = useState({})
    const [eventRSVP, setEventRSVP] = useState([])
    const [currentUserRSVP, setCurrentUserRSVP] = useState()
    const [currentUserRSVPObj, setCurrentUserRSVPObj] = useState({})

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

    const eventButtons = () => {
        return (
            <div className="view-event-btn-container">
                {currentUserRSVP && (
                    <button className="view-event-btn-danger btn btn-danger" onClick={event => {
                        event.preventDefault()
                        console.log("Attempting to delete RSVP")
                        deleteEventRSVP(currentUserRSVPObj.id).then(() => {
                            updateData()
                            setCurrentUserRSVP(!currentUserRSVP)
                        })
                    }}>
                        UN-RSVP
                    </button>
                )}

                {!currentUserRSVP && (
                    <button className="view-event-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        console.log("Attempting to create RSVP")
                        createEventRSVP(currentUser.id, parseInt(eventId.eventId)).then(() => {
                            updateData()
                            setCurrentUserRSVP(!currentUserRSVP)
                        })
                    }}>
                        RSVP
                    </button>
                )}

                {currentUser.id === event.userId && (
                    <>
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
                    </>
                )}
            </div>
        )
    }

    const Tooltip = ({ children, text }) => {
        const [visible, setVisible] = useState(false)

        return (
            <div style={{ position: 'relative' }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
                {visible && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#333',
                        color: 'white',
                        zIndex: 10,
                        marginTop: '4px'
                    }}>
                        {text}
                    </div>
                )}
            </div>
        )
    }

    useEffect(() => {
        getEventById(eventId.eventId).then(eventObj => {
            setEvent(eventObj)
            setEventRSVP(eventObj.eventRSVP)
            setCurrentUserRSVP(eventObj.eventRSVP.some(rsvp => rsvp.userId === currentUser.id))
            setCurrentUserRSVPObj(eventObj.eventRSVP.find(rsvp => rsvp.userId === currentUser.id))
        })
    }, [currentUserRSVP])

    return (
        <div className="view-event-container">
            <header className="view-event-header">
                {/* Author Profile Picture */}
                <Link to={`/user_account/${event.user?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div className="view-event-profile-picture">
                        <Tooltip text={event.user?.username}><img src={authorProfilePicture()} /></Tooltip>
                    </div>
                </Link>
                <div className="view-event-header-text">
                    <div className="view-event-header-text-top">
                        <h1 className="view-event-title">{event.title}</h1>
                        {eventButtons()}
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
                <ViewEventRSVP eventRSVP={eventRSVP} setCurrentUserRSVPObj={setCurrentUserRSVPObj} currentUser={currentUser} />

                <div className="view-event-body">{event.body}</div>

                <section className="view-event-image-container">
                    <img className="view-event-image" src={event.eventImageUrl} />
                </section>
            </section>

        </div>
    )
}