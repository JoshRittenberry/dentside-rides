export const getAllPosts = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts?_expand=postTopic&_embed=postLikes&_expand=user`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts/${id}?_expand=postTopic&_embed=postLikes&_expand=user`).then(res => res.json())
}

export const getPostOnlyById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts/${id}`).then(res => res.json())
}

export const getAllPostTopics = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/postTopics`).then(res => res.json())
}

export const getPostLikesByPostId = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/postLikes?postId=${id}`).then(res => res.json())
}

export const uploadPost = (newPost) => {
    const postObj = {...newPost}
    
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
}

export const uploadPostChanges = (post) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (postId) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/posts/${postId}`, {
        method: "DELETE",
    })
}

export const reactToPost = (userId, postId, postLikesArray, status) => {
    const postLike = {
        "userId": userId,
        "postId": postId,
        "status": status,
    }

    const existingPostLike = postLikesArray.find(postLike => postLike.userId === userId)

    if (existingPostLike) {
        if (existingPostLike.status != status) {
            return fetch(`https://dentside-rides-api-copy.onrender.com/postLikes/${existingPostLike.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postLike)
            }) 
        } else if (existingPostLike.status == status) {
            return fetch(`https://dentside-rides-api-copy.onrender.com/postLikes/${existingPostLike.id}`, {
                method: "DELETE",
            })
        }

    } else if (!existingPostLike) {
        return fetch(`https://dentside-rides-api-copy.onrender.com/postLikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postLike)
        })
    }


}