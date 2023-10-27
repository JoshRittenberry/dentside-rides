import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { AllClassifiedsItem } from "../../classifieds/AllClassifiedsItem"
import { FilterClassifiedsBTN } from "../../classifieds/FilterClassifiedsBTN"
import { getUserById } from "../../../services/userService"

export const UserClassifieds = ({ allClassifieds, currentUser, updateData }) => {
    const [userAccountId, setUserAccountId] = useState(0)
    const [userAccount, setUserAccount] = useState({})
    const [userClassifieds, setUserClassifieds] = useState([])
    const [filteredClassifieds, setFilteredClassifieds] = useState([])

    const navigate = useNavigate()
    const id = useParams()

    useEffect(() => {
        setUserAccountId(parseInt(id.userId))
        getUserById(id.userId).then(userObj => {
            setUserAccount(userObj)
        })
    }, [])

    useEffect(() => {
        setUserClassifieds(allClassifieds.filter(classified => classified.userId === userAccountId))

        if (userAccountId === currentUser.id) {
            navigate("/my_classifieds")
        }
    }, [userAccountId, allClassifieds])

    return (
        <div className="classifieds-container">
            {/* All Classifieds Header */}
            <header className="classifieds-header">
                <h1>{userAccount.username}'s Classifieds</h1>
                <button className="btn btn-light" onClick={event => {
                    navigate("/new_classified")
                }}>
                    Create Classified
                </button>
                <FilterClassifiedsBTN classifieds={userClassifieds} filteredClassifieds={filteredClassifieds} setFilteredClassifieds={setFilteredClassifieds} />

                {/* I want this but gawt dang its being a pain in my ass */}
                {/* <SortClassifiedsBTN allClassifieds={allClassifieds} setAllClassifieds={setAllClassifieds} /> */}
            </header>

            {/* All Classifieds List Container */}
            <section className="classifieds-list">
                {filteredClassifieds.map(classifiedObj => {
                    return (
                        <AllClassifiedsItem currentUser={currentUser} classifiedObj={classifiedObj} updateData={updateData} key={classifiedObj.id} />
                    )
                })}
            </section>
        </div>
    )
}