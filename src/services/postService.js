export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=postTopic&_embed=postLikes&_expand=user`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}?_expand=postTopic&_embed=postLikes&_expand=user`).then(res => res.json())
}

export const getPostOnlyById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`).then(res => res.json())
}

export const getAllPostTopics = () => {
    return fetch(`http://localhost:8088/postTopics`).then(res => res.json())
}

export const uploadPost = (newPost) => {
    const postObj = {...newPost}
    
    return fetch(`http://localhost:8088/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
}

export const uploadPostChanges = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
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
            return fetch(`http://localhost:8088/postLikes/${existingPostLike.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postLike)
            }) 
        } else if (existingPostLike.status == status) {
            return fetch(`http://localhost:8088/postLikes/${existingPostLike.id}`, {
                method: "DELETE",
            })
        }

    } else if (!existingPostLike) {
        return fetch(`http://localhost:8088/postLikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postLike)
        })
    }


}