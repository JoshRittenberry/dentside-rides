import "./ViewClassified.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getClassifiedById } from "../../services/classifiedService"
import { getUserById } from "../../services/userService"

export const ViewClassified = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [classified, setClassified] = useState({})
    const [classifiedImages, setClassifiedImages] = useState([])

    const classifiedId = useParams()

    useEffect(() => {
        getUserById().then(userObj => {
            setCurrentUser(userObj)
        })

        getClassifiedById(classifiedId).then(classifiedObj => {
            setClassified(classifiedObj)
            setClassifiedImages(classifiedObj.classifiedImages)
        })
    }, [])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <h1>View Classified</h1>
        </>
    )
}