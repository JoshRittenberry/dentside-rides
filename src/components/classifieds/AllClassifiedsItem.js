import { useEffect, useState } from "react"
import "./AllClassifiedsItem.css"
import { Link, useNavigate } from "react-router-dom"
import { deleteClassified } from "../../services/classifiedService"

export const AllClassifiedsItem = ({ currentUser, classifiedObj, updateData }) => {

    const [classifiedLikes, setClassifiedLikes] = useState(0)
    const [userIsClassifiedOwner, setUserIsClassifiedOwner] = useState(false)

    const navigate = useNavigate()

    const classifiedTopicClassName = "classified-topic-item classified-topic-" + classifiedObj.classifiedTopicId

    useEffect(() => {
        if (currentUser.id === classifiedObj.userId) {
            setUserIsClassifiedOwner(true)
        }
    }, [])

    return (
        <div className="classified-container">
            <div className="classified">
                <div className="classified-img">
                    <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png"/>
                </div>
                <div className="classified-info">
                    <Link to={`/classifieds/${classifiedObj.id}`}>
                        <h4>{classifiedObj.title}</h4>
                    </Link>
                    <div>
                        <h6>${classifiedObj.price}</h6>
                    </div>
                    <div>
                        <h6>{classifiedObj.location}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}