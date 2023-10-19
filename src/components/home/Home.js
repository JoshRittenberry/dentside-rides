import "./Home.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"

export const Home = ({ currentUser }) => {
    return (
        <>
            <UserSideBar currentUser={currentUser} />
            <div>
                <h1>Welcome to Dentside Rides</h1>
            </div>
        </>
    )
}