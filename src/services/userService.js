export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users?_embed=postLikes&_embed=posts`).then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8088/users/12?_embed=postLikes&_embed=posts`).then(res => res.json())
}