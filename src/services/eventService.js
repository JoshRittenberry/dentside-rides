import { eventWrapper } from "@testing-library/user-event/dist/utils"

export const getAllEvents = () => {
    return fetch(`http://localhost:8088/events?_expand=user&_expand=eventType`).then(res => res.json())
}

export const getEventById = (id) => {
    return fetch(`http://localhost:8088/events/${id}?_expand=user&_expand=eventType`).then(res => res.json())
}

export const getEventOnlyById = (id) => {
    return fetch(`http://localhost:8088/events/${id}`).then(res => res.json())
}

export const getAllEventTypes = () => {
    return fetch(`http://localhost:8088/eventTypes`).then(res => res.json())
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

    return fetch(`http://localhost:8088/events`, {
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

    return fetch(`http://localhost:8088/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    })
}