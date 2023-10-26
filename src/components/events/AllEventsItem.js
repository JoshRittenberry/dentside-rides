import "./AllEventsItem.css"
import { Link } from "react-router-dom"

export const AllEventsItem = ({ currentUser, eventObj, updateData, key }) => {
    const eventImage = () => {
        if (eventObj.eventImageUrl != "") {
            return eventObj.eventImageUrl
        }
    }

    return (
        <div className="event-container">
            <div className="event">
                <Link to={`/events/${eventObj.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div className="event-img-container">
                        <img className="event-img" src={eventImage()} />
                    </div>

                    <div className="event-info">
                        <h4>{eventObj.title}</h4>
                    </div>
                    <div className="event-footer">
                        <h6>{eventObj.location}</h6>
                        <h6>{eventObj.eventStartDate}</h6>
                    </div>
                </Link>
            </div>
        </div>
    )
}