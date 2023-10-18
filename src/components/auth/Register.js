import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isStaff: false,
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        createUser(customer).then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem(
                    "dentside_user",
                    JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff,
                    })
                )

                navigate("/")
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getUserByEmail(customer.email).then((response) => {
            if (response.length > 0) {
                // Duplicate email. No good.
                window.alert("Account with that email address already exists")
            } else {
                // Good email, create user.
                registerNewUser()
            }
        })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png" className="login-logo" />
            <form className="form-login" onSubmit={handleRegister}>
                <h1>Honey Rae Repairs</h1>
                <h2>Please Register</h2>
                <fieldset>
                    <div className="form-group">
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="fullName"
                            className="form-control"
                            placeholder="Enter your name"
                            required
                            autoFocus
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            onChange={updateCustomer}
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label>
                            <input
                                onChange={(evt) => {
                                    const copy = { ...customer }
                                    copy.isStaff = evt.target.checked
                                    setCustomer(copy)
                                }}
                                type="checkbox"
                                id="isStaff"
                            />
                            I am an admin{" "}
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <button className="login-btn btn-info" type="submit">
                            Register
                        </button>
                    </div>
                </fieldset>
            </form>
        </main>
    )
}
