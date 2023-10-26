export const getAllEvents = () => {
    return fetch(`http://localhost:8088/events?_expand=user&_expand=eventType`).then(res => res.json())
}

export const getEventById = (id) => {
    return fetch(`http://localhost:8088/events/${id}?_expand=user&_expand=eventType`).then(res => res.json())
}

export const getAllEventTypes = () => {
    return fetch(`http://localhost:8088/eventTypes`).then(res => res.json())
}