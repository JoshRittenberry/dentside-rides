import { eventWrapper } from "@testing-library/user-event/dist/utils"

export const getAllEvents = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/events?_expand=user&_expand=eventType`).then(res => res.json())
}

export const getEventById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/events/${id}?_expand=user&_embed=eventType&_embed=eventRSVP`).then(res => res.json())
}

export const getEventOnlyById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/events/${id}`).then(res => res.json())
}

export const getAllEventTypes = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/eventTypes`).then(res => res.json())
}

export const getEventRSVPByEventId = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/eventRSVP?eventId=${id}`).then(res => res.json())
}

export const createEventRSVP = (userId, eventId) => {
    let rsvpObj = {
        userId: userId,
        eventId: eventId
    }

    return fetch(`https://dentside-rides-api-copy.onrender.com/eventRSVP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rsvpObj)
    }).then(() => {
        console.log("RSVP Created")
    })
}

export const deleteEventRSVP = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/eventRSVP/${id}`, {
        method: "DELETE",
    })
}

export const uploadEvent = (newEvent) => {
    let eventObj = null
    
    if (newEvent.eventImageUrl == "") {
        const newEventCopy = { ...newEvent }
        newEventCopy.eventImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
        eventObj = newEventCopy
    } else {
        eventObj = newEvent
    }

    return fetch(`https://dentside-rides-api-copy.onrender.com/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    })
}

export const uploadEventChanges = (event) => {
    let eventObj = null

    if (event.eventImageUrl == "") {
        const newEventCopy = { ...event }
        newEventCopy.eventImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
        eventObj = newEventCopy
    } else {
        eventObj = event
    }

    return fetch(`https://dentside-rides-api-copy.onrender.com/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    })
}

export const deleteEvent = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/events/${id}`, {
        method: "DELETE",
    })
}