import "./Home.css"
import { UserSideBar } from "../user-sidebar/UserSideBar"

export const Home = ({ currentUser }) => {
    return (
        <main>
            <UserSideBar currentUser={currentUser} />
            <div>
                <h1>THIS IS A HOME PAGE THAT IS MEANT TO BE CHANGED</h1>
            </div>
        </main>
    )
}