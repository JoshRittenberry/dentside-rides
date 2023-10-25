import "./HomeEventItem.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const HomeEventItem = ({ currentUser, eventObj, updateData }) => {
    const [userIsEventOwner, setUserIsEventOwner] = useState(false)

    const getMonthAbbreviation = () => {
        const date = new Date(eventObj.eventStartDate);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months[date.getMonth()];
    }

    const getDayNumber = () => {
        const date = new Date(eventObj.eventStartDate);

        return date.getDate();
    }

    useEffect(() => {
        if (currentUser.id === eventObj.userId) {
            setUserIsEventOwner(true)
        }
    }, [currentUser, eventObj])

    return (
        <Link to={`/events/${eventObj.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="home-event-container">
                {/* Maybe we'll add this */}
                {/* <div className="home-event-rsvp-container">
                    <button>
                        RSVP
                    </button>
                </div> */}

                <div className="home-event-info">
                        <h5 className="home-event-title">{eventObj.title}</h5>

                    <div className="home-event-location"><strong>Event Location:</strong> {eventObj.location}</div>
                </div>

                <div className="home-event-date">
                    <div className="home-event-date-month">
                        {getMonthAbbreviation()}
                    </div>

                    <div className="home-event-date-day">
                        {getDayNumber()}
                    </div>
                </div>
            </div>
        </Link>
    )
}