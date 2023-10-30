import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        username: "",
        email: "",
        password: "",
        imageUrl: "",
        joinDate: "",
    });
    let navigate = useNavigate();

    const registerNewUser = () => {
        createUser(customer).then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem(
                    "dentside_user",
                    JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff,
                    })
                );

                navigate("/");
            }
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        getUserByEmail(customer.email).then((response) => {
            if (response.length > 0) {
                // Duplicate email. No good.
                window.alert("Account with that email address already exists");
            } else {
                // Good email, create user.
                registerNewUser();
            }
        });
    };

    const updateCustomer = (evt) => {
        const copy = { ...customer };
        copy[evt.target.id] = evt.target.value;
        setCustomer(copy);
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setCustomer(prevState => ({ ...prevState, joinDate: getCurrentDate() }));
    }, []);

    return (
        <main style={{ textAlign: "center" }}>
            <img src="https://i.ibb.co/Z82H6NW/F100-1812-FGEN-42.png" className="login-logo" />
            <form className="form-login" onSubmit={handleRegister}>
                <h1>Dentside Rides</h1>
                <h2>Please Register</h2>
                <fieldset>
                    <div className="form-group">
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Enter your Username"
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
                            placeholder="Email Address"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input
                            onChange={updateCustomer}
                            type="url"
                            id="imageUrl"
                            className="form-control"
                            placeholder="Image URL"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <button className="login-btn btn-info" type="submit">
                            Create Account
                        </button>
                    </div>
                </fieldset>
            </form>
        </main>
    )
}
