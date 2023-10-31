import "./ViewClassified.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteClassified, getClassifiedById } from "../../services/classifiedService"
import { getUserById } from "../../services/userService"
import { ClassifiedImageCarousel } from "./ClassifiedImageCarousel"

export const ViewClassified = ({ updateData }) => {
    const [currentUser, setCurrentUser] = useState({})
    const [classified, setClassified] = useState({})
    const [classifiedImages, setClassifiedImages] = useState([])
    const [useCarousel, setUseCarousel] = useState(false)

    const classifiedId = useParams()
    const navigate = useNavigate()
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
                <div className="view-classified-btn-container">
                    <button className="view-classified-btn btn btn-light" onClick={event => {
                        event.preventDefault()
                        navigate(`/edit_classified/${classified.id}`)
                    }}>
                        Edit
                    </button>

                    <button className="view-classified-btn-danger btn btn-danger" onClick={event => {
                        event.preventDefault()
                        deleteClassified(classified.id).then(() => {
                            updateData()
                            navigate("/classifieds")
                        })
                    }}>
                        Delete
                    </button>
                </div>
            )
        }
    }

    const formatDate = (classifiedDate) => {
        const date = new Date(classifiedDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const Tooltip = ({ children, text }) => {
        const [visible, setVisible] = useState(false);

        return (
            <div style={{ position: 'relative' }}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
                {visible && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#333',
                        color: 'white',
                        zIndex: 10,
                        marginTop: '4px'
                    }}>
                        {text}
                    </div>
                )}
            </div>
        );
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
            if (classifiedObj.classifiedImages?.length > 2) {
                setUseCarousel(true)
            }
        })
    }, [])

    return (
            <div className="view-classified-container">
                <header className="view-classified-header">
                    {/* Author Profile Picture */}
                    <Link to={`/user_account/${classified.user?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <div className="view-classified-profile-picture-container">
                            <Tooltip text={classified.user?.username}><img className="view-classified-profile-picture" src={authorProfilePicture()} /></Tooltip>
                        </div>
                    </Link>
                    <div className="view-classified-header-text">
                        <div className="view-classified-header-text-top">
                            <h1 className="view-classified-title">{classified.title}</h1>
                            {classifiedAuthorButtons()}
                        </div>
                        <div className={classifiedItemTypeName}>${classified.price}</div>
                        <div className="view-classified-info">
                            <div>{classified.location}</div>
                            <div>{formatDate(classified.classifiedDate)}</div>
                        </div>
                    </div>
                </header>

                <section className="view-classified-body-container">
                    <div className="view-classified-body">{classified.body}</div>
                    <div className="view-classified-images-container">
                        {useCarousel && <ClassifiedImageCarousel newClassifiedImages={classifiedImages} />}
                        {!useCarousel && (
                            <div className="view-classified-image-container">
                                <img className="view-classified-image" src={classifiedImages[0]?.url} />
                            </div>
                        )}
                    </div>
                </section>
            </div>
    )
}