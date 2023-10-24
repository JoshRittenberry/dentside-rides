import "./AllEventsItem.css"
import { Link } from "react-router-dom"

export const AllEventsItem = ({ currentUser, eventObj, updateData, key }) => {
    return (
        <div className="event-container">
            <div className="event">
                <img className="event-img" src="https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?fit=1200%2C800&ssl=1" />
                <div className="event-info">
                    <Link to={`/events/${eventObj.id}`}>
                        <h4>{eventObj.title}</h4>
                    </Link>
                    <div className="event-info-footer">
                        <h6>{eventObj.location}</h6>
                        <h6>{eventObj.eventStartDate}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}