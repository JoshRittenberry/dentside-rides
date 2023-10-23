import "./CreateClassified.css"
import { useNavigate, useParams } from "react-router-dom"
import { getAllItemTypes, getClassifiedById, getClassifiedOnlyById, uploadClassifiedChanges } from "../../services/classifiedService"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { ClassifiedImageCarousel } from "./ClassifiedImageCarousel"
import { CreateClassifiedImageInputs } from "./CreateClassifiedImageInputs"

export const EditClassified = ({ currentUser, updateData }) => {
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
    const classifiedId = useParams()

    const setClassifiedItemDropdownText = () => {
        if (newClassified.itemTypeId != 0) {
            itemTypes.map(itemType => {
                if (itemType.id === newClassified.itemTypeId) {
                    setItemTypeText(itemType.name)
                }
            })
        }
    }

    const setClassifiedImages = (classifiedObjId) => {
        getClassifiedById(classifiedObjId).then(classified => {
            let index = 0
    
            let arrayOfObjects = new Array(6).fill({}).map(() => ({
                id: 0,
                classifiedId: classified.id,
                url: "",
            }));
    
            classified.classifiedImages.map(imageObj => {
                arrayOfObjects[index].id = imageObj.id
                arrayOfObjects[index].url = imageObj.url
                index++
            })
    
            setNewClassifiedImages(arrayOfObjects)
        })

    }

    useEffect(() => {
        getClassifiedOnlyById(classifiedId.classifiedId).then(classifiedObj => {
            if (currentUser.id === classifiedObj.userId) {
                setNewClassified(classifiedObj)
                setClassifiedImages(classifiedObj.id)
            } else {
                navigate("/posts")
            }
        })

        getAllItemTypes().then(itemTypesArray => {
            setItemTypes(itemTypesArray)
        })

    }, [currentUser])

    useEffect(() => {
        setClassifiedItemDropdownText()
    }, [newClassified])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
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

                        <CreateClassifiedImageInputs newClassifiedImages={newClassifiedImages} setNewClassifiedImages={setNewClassifiedImages} />

                    </form>

                    {/* Classified Pictures on the right */}
                    <form className="create-classified-form">
                        <h1>Classified Images</h1>

                        <section className="create-">
                            <ClassifiedImageCarousel newClassifiedImages={newClassifiedImages} />
                        </section>
                    </form>
                </div>

                {/* Buttons on the bottom */}
                <div className="create-classified-btn-container">
                    <button className="create-classified-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        uploadClassifiedChanges(newClassified, newClassifiedImages).then(() => {
                            updateData()
                            navigate("/classifieds")
                        })
                    }}>
                        Save Classified
                    </button>
                    <button className="create-classified-btn btn btn-light" onClick={() => {

                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}