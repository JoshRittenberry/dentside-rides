import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
    const [email, set] = useState("fordfred@dentsiderides.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem(
                    "dentside_user",
                    JSON.stringify({
                        id: user.id,
                        isStaff: user.isStaff,
                    })
                )
                navigate("/")
            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <main className="container-login">
            <section>
                <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png" className="login-logo" />
                <form className="form-login" onSubmit={handleLogin}>
                    <h1>Dentside Rides</h1>
                    <h2>Please Login</h2>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={(evt) => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button className="login-btn btn-info" type="submit" onClick={() => {
                                window.alert("I Promise the webpage is loading, but it takes about a minute since I'm utilizing render.com to host my API for free :)")
                            }}>
                                Login
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section>
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
