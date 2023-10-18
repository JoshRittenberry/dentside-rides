import "./Home.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"

export const Home = ({ currentUser }) => {
    return (
        <main>
            <UserSideBar currentUser={currentUser} />
            <div>
                <h1>Welocme to Dentside Rides</h1>
            </div>
        </main>
    )
}