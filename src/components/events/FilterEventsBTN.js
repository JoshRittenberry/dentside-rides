import { useEffect, useState } from "react"
import { getAllEventTypes } from "../../services/eventService"

export const FilterEventsBTN = ({ events, filteredEvents, setFilteredEvents }) => {
    const [eventTypes, setEventTypes] = useState([])
    const [filter, setFilter] = useState(0)
    const [buttonText, setButtonText] = useState("Filter Events by Event Type")

    const setDropdownButtonText = () => {
        const chosenFilter = eventTypes?.find(eventType => eventType.id === filter)
        if (chosenFilter) {
            setButtonText(chosenFilter.name)
        } else {
            setButtonText("Filter Events by Event Type")
        }
    }

    useEffect(() => {
        getAllEventTypes().then(eventTypesArray => {
            setEventTypes(eventTypesArray)
        })
    }, [])

    useEffect(() => {
        setDropdownButtonText()
        if (filter > 0) {
            setFilteredEvents(events.filter(event => event.eventTypeId === filter))
        } else if (filter === 0) {
            setFilteredEvents(events)
        }
    }, [events, filter])

    return (

        <div className="dropdown">
            <button className="btn btn-light dropdown-toggle filter-event-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {buttonText}
            </button>
            <ul className="dropdown-menu dropdown-menu">
                <li><a className="dropdown-item" id="0" onClick={event => {
                    setFilter(parseInt(event.target.id))
                }}>
                    All Events
                </a></li>

                {eventTypes.map(eventType => {
                    return (
                        <li key={eventType.id}><a className="dropdown-item" id={eventType.id} onClick={event => {
                            setFilter(parseInt(event.target.id))
                        }}>
                            {eventType.name}
                        </a></li>
                    )
                })}

            </ul>
        </div>
    )
}