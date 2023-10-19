import { useEffect, useState } from "react"
import "./AllClassifiedsItem.css"
import { Link, useNavigate } from "react-router-dom"
import { deleteClassified } from "../../services/classifiedService"

export const AllClassifiedsItem = ({ currentUser, classifiedObj, updateData }) => {
    const [classifiedImage, setClassifiedImage] = useState("")
    const [userIsClassifiedOwner, setUserIsClassifiedOwner] = useState(false)

    const navigate = useNavigate()

    const classifiedTopicClassName = "classified-topic-item classified-topic-" + classifiedObj.classifiedTopicId

    const getClassifiedImage = () => {
        if (classifiedObj.classifiedImages[0].url) {
            console.log("it found a url")
            setClassifiedImage(classifiedObj.classifiedImages[0].url) 
        } else if (!classifiedObj.classifiedImages[0].url){
            console.log("it did not find a url")
            setClassifiedImage("https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=")
        }
    }

    useEffect(() => {
        if (currentUser.id === classifiedObj.userId) {
            setUserIsClassifiedOwner(true)
        }

        getClassifiedImage()
    }, [currentUser, classifiedObj])

    return (
        <div className="classified-container">
            <div className="classified">
                <img className="classified-img" src={classifiedImage}/>
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