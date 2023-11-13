import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"

export const ViewEventRSVP = ({ eventRSVP }) => {
    const [userRSVP, setUserRSVP] = useState([])

    useEffect(() => {
        // Fetch all user data in parallel
        const fetchUsers = async () => {
            const userPromises = eventRSVP.map(rsvp => getUserById(rsvp.userId))
            const users = await Promise.all(userPromises)
            setUserRSVP(users)
        }

        fetchUsers()
    }, [eventRSVP])

    return (
        <div className="view-event-rsvp">
            <h5 className="event-rsvp-header">RSVP List</h5>
            {userRSVP.map((userObj, index) => (
                <div key={index}>{userObj.username}</div>
            ))}
        </div>
    )
}
