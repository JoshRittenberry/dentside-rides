import { useEffect, useState } from "react"
import { getEventRSVPByEventId } from "../../services/eventService"
import { getUserById } from "../../services/userService"

export const ViewEventRSVP = ({ eventId }) => {
    const [eventRSVPs, setEventRSVPs] = useState([])
    const [userRSVP, setUserRSVP] = useState([])
    
    useEffect(() => {
        getEventRSVPByEventId(eventId).then(array => {
            setEventRSVPs(array)
        })
    }, [eventId])

    useEffect(() => {
        eventRSVPs.map(rsvp => {
            getUserById(rsvp.userId).then(userObj => {
                userRSVP.push(userObj)
            })
        })
    }, [eventRSVPs])

    return (
        <div className="view-event-rsvp">
            {userRSVP.map(userObj => {
                return (
                    <div>{userObj.username}</div>
                )
            })}
        </div>
    )
}