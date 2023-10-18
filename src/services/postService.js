export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=postTopic&_embed=postLikes&_expand=user`).then(res => res.json())
}