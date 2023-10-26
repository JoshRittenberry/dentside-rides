import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserSideBar } from "../../user-sidebar/UserSideBar"
import { AllClassifiedsItem } from "../../classifieds/AllClassifiedsItem"
import { FilterClassifiedsBTN } from "../../classifieds/FilterClassifiedsBTN"

export const MyClassifieds = ({ myClassifieds, currentUser, updateData }) => {
    const [filteredClassifieds, setFilteredClassifieds] = useState([])
    const navigate = useNavigate()

    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div className="classifieds-container">
                {/* All Classifieds Header */}
                <header className="classifieds-header">
                    <h1>My Classifieds</h1>
                    <button className="btn btn-light" onClick={event => {
                        navigate("/new_classified")
                    }}>
                        Create Classified
                    </button>
                    <FilterClassifiedsBTN classifieds={myClassifieds} filteredClassifieds={filteredClassifieds} setFilteredClassifieds={setFilteredClassifieds} />

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
        </>
    )
}