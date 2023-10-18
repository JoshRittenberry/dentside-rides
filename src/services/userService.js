export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users?_embed=postLikes&_embed=posts`).then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}?_embed=postLikes&_embed=posts`).then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then(res => res.json())
}

export const createUser = (user) => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
}