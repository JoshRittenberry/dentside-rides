import "./ViewClassified.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getClassifiedById } from "../../services/classifiedService"
import { getUserById } from "../../services/userService"
import { ClassifiedImageCarousel } from "./ClassifiedImageCarousel"

export const ViewClassified = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [classified, setClassified] = useState({})
    const [classifiedImages, setClassifiedImages] = useState([])

    const classifiedId = useParams()
    let classifiedItemTypeName = "classified-topic-item classified-topic-" + classified.itemTypeId

    const authorProfilePicture = () => {
        if (classified.user?.imageUrl != "") {
            return classified.user?.imageUrl
        } else {
            return `https://i.ibb.co/jznVcXy/240-F-516275801-f3-Fsp17x6-HQK0x-Qg-DQEELo-Tu-ERO4-Ss-WV.jpg`
        }
    }

    const classifiedAuthorButtons = () => {
        if (currentUser.id === classified.userId) {
            return (
                <div>
                    <button className="view-post-btn btn btn-light">Edit</button>
                    <button className="view-post-btn btn btn-light">Delete</button>
                </div>
            )
        }
    }

    useEffect(() => {
        const localDentsideUser = localStorage.getItem("dentside_user")
        const dentsideUserId = JSON.parse(localDentsideUser)

        getUserById(dentsideUserId.id).then(userObj => {
            setCurrentUser(userObj)
        })

        getClassifiedById(classifiedId.classifiedId).then(classifiedObj => {
            setClassified(classifiedObj)
            setClassifiedImages(classifiedObj.classifiedImages)
        })
    }, [])

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="view-classified-container">
                <header className="view-classified-header">
                    {/* Author Profile Picture */}
                    <Link to={`/user_account/${classified.user?.id}`}>
                        <div className="view-classified-profile-picture">
                            <img src={authorProfilePicture()} />
                        </div>
                    </Link>
                    <div className="view-classified-header-text">
                        <div className="view-classified-header-text-top">
                            <h1 className="view-classified-title">{classified.title}</h1>
                            {classifiedAuthorButtons()}
                        </div>
                        <div className={classifiedItemTypeName}>${classified.price}</div>
                        <div className="view-classified-info">
                            <Link to={`/user_account/${classified.user?.id}`}>
                                <div>{classified.user?.username}</div>
                            </Link>
                            <div>{classified.classifiedDate}</div>
                        </div>
                    </div>
                </header>

                <section className="view-classified-body-container">
                    <div className="view-classified-body">{classified.body}</div>
                    <ClassifiedImageCarousel newClassifiedImages={classifiedImages} />
                </section>
            </div>
        </>
    )
}