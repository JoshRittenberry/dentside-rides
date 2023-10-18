export const getAllClassifieds = () => {
    return fetch(`http://localhost:8088/classifieds?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
}