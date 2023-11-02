export const getAllUsers = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/users?_embed=postLikes&_embed=posts`).then(res => res.json())
}

export const getAllUsersOnly = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/users`).then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/users/${id}?_embed=postLikes&_embed=posts`).then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/users?email=${email}`).then(res => res.json())
}

export const createUser = (user) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then(res => res.json())
}