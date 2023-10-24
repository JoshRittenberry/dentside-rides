export const getAllEvents = () => {
    return fetch(`http://localhost:8088/events?_expand=user&_expand=eventType`).then(res => res.json())
}