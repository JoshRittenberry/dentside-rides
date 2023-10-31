import "./CreateClassified.css"
import { useNavigate } from "react-router-dom"
import { getAllClassifieds, getAllItemTypes, uploadClassified } from "../../services/classifiedService"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { ClassifiedImageCarousel } from "./ClassifiedImageCarousel"
import { CreateClassifiedImageInputs } from "./CreateClassifiedImageInputs"

export const CreateClassified = ({ currentUser, allClassifieds, updateData }) => {
    const [itemTypes, setItemTypes] = useState([])
    const [itemTypeText, setItemTypeText] = useState("Set Item Type")
    const [newClassified, setNewClassified] = useState({
        "userId": 0,
        "classifiedDate": "",
        "itemTypeId": 0,
        "title": "",
        "body": "",
        "location": "",
        "price": "",
    })
    const [newClassifiedImages, setNewClassifiedImages] = useState([])

    const navigate = useNavigate()

    const setClassifiedItemDropdownText = () => {
        if (newClassified.itemTypeId != 0) {
            itemTypes.map(itemType => {
                if (itemType.id === newClassified.itemTypeId) {
                    setItemTypeText(itemType.name)
                }
            })
        }
    }

    const getCurrentDateFormatted = () => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, hence +1 and pad
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        const newClassifiedCopy = { ...newClassified }
        newClassifiedCopy.userId = currentUser.id
        newClassifiedCopy.classifiedDate = getCurrentDateFormatted()

        setNewClassified(newClassifiedCopy)

        getAllItemTypes().then(itemTypesArray => {
            setItemTypes(itemTypesArray)
        })

        const arrayOfObjects = new Array(5).fill({}).map(() => ({
            classifiedId: 0,
            url: "",
        }));

        setNewClassifiedImages(arrayOfObjects)
    }, [currentUser])

    useEffect(() => {
        setClassifiedItemDropdownText()
    }, [newClassified])

    return (
        <div className="create-classified-container">
            <h1>Create Classified</h1>

            <div className="create-classified-flex-container">
                {/* Classified Details on the left */}
                <form className="create-classified-form">
                    <section className="create-classified-form-header">
                        <input
                            className="create-classified-title"
                            type="text"
                            placeholder="Classified Title"
                            value={newClassified.title}
                            onChange={event => {
                                event.preventDefault()
                                const newClassifiedCopy = { ...newClassified }
                                newClassifiedCopy.title = event.target.value
                                setNewClassified(newClassifiedCopy)
                            }}
                        />
                        <input
                            className="create-classified-price"
                            type="number"
                            min={0}
                            placeholder="Price"
                            value={newClassified.price}
                            onChange={event => {
                                event.preventDefault()
                                if (event.target.value < 0) {
                                    const newClassifiedCopy = { ...newClassified }
                                    newClassifiedCopy.price = 0
                                    setNewClassified(newClassifiedCopy)
                                } else {
                                    const newClassifiedCopy = { ...newClassified }
                                    newClassifiedCopy.price = event.target.value
                                    setNewClassified(newClassifiedCopy)
                                }
                            }}
                        />
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {itemTypeText}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {itemTypes.map(itemType => {
                                    return (
                                        <li key={itemType.id}><a className="dropdown-item" id={itemType.id} onClick={event => {
                                            event.preventDefault()
                                            const newClassifiedCopy = { ...newClassified }
                                            newClassifiedCopy.itemTypeId = parseInt(event.target.id)
                                            setNewClassified(newClassifiedCopy)
                                        }}>
                                            {itemType.name}
                                        </a></li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>

                    <textarea
                        className="create-classified-body"
                        type="text"
                        placeholder="Classified Body"
                        value={newClassified.body}
                        onChange={event => {
                            event.preventDefault()
                            const newClassifiedCopy = { ...newClassified }
                            newClassifiedCopy.body = event.target.value
                            setNewClassified(newClassifiedCopy)
                        }}
                    />

                    <input
                        className="create-classified-location"
                        type="text"
                        placeholder="Classified Location"
                        value={newClassified.location}
                        onChange={event => {
                            event.preventDefault()
                            const newClassifiedCopy = { ...newClassified }
                            newClassifiedCopy.location = event.target.value
                            setNewClassified(newClassifiedCopy)
                        }}
                    />

                    <CreateClassifiedImageInputs newClassifiedImages={newClassifiedImages} setNewClassifiedImages={setNewClassifiedImages} />

                </form>

                {/* Classified Pictures on the right */}
                <form className="create-classified-form">
                    <h1>Classified Images</h1>

                    <section className="create-classified-image-container">
                        <ClassifiedImageCarousel newClassifiedImages={newClassifiedImages} />
                    </section>
                </form>
            </div>

            {/* Buttons on the bottom */}
            <div className="create-classified-btn-container">
                <button className="create-classified-btn btn btn-light" onClick={event => {
                    event.preventDefault()
                    uploadClassified(newClassified, newClassifiedImages).then(() => {
                        updateData()
                        navigate("/classifieds")
                    })
                }}>
                    Save Classified
                </button>
                <button className="create-classified-btn-danger btn btn-danger" onClick={() => {

                }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}