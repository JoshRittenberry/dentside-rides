import { useEffect, useState } from "react"
import { getAllItemTypes } from "../../services/classifiedService"

export const FilterClassifiedsBTN = ({ classifieds, filteredClassifieds, setFilteredClassifieds }) => {
    const [itemTypes, setItemTypes] = useState([])
    const [filter, setFilter] = useState(0)
    const [buttonText, setButtonText] = useState("Filter Classifieds by Topic")

    const setDropdownButtonText = () => {
        const chosenFilter = itemTypes?.find(itemType => itemType.id === filter)
        if (chosenFilter) {
            setButtonText(chosenFilter.name)
        } else {
            setButtonText("Filter Classifieds by Item Type")
        }
    }

    useEffect(() => {
        getAllItemTypes().then(itemTypesArray => {
            setItemTypes(itemTypesArray)
        })
    }, [])

    useEffect(() => {
        setDropdownButtonText()
        if (filter > 0) {
            setFilteredClassifieds(classifieds.filter(classified => classified.itemTypeId === filter))
        } else if (filter === 0) {
            setFilteredClassifieds(classifieds)
        }
    }, [classifieds, filter])

    return (

        <div className="dropdown">
            <button className="btn btn-light dropdown-toggle filter-classified-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {buttonText}
            </button>
            <ul className="dropdown-menu dropdown-menu">
                <li><a className="dropdown-item" id="0" onClick={event => {
                    setFilter(parseInt(event.target.id))
                }}>
                    All Classifieds
                </a></li>

                {itemTypes.map(itemType => {
                    return (
                        <li key={itemType.id}><a className="dropdown-item" id={itemType.id} onClick={event => {
                            setFilter(parseInt(event.target.id))
                        }}>
                            {itemType.name}
                        </a></li>
                    )
                })}

            </ul>
        </div>
    )
}