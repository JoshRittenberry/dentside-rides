export const getAllClassifieds = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
}

export const getClassifiedById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds/${id}?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
}

export const getClassifiedOnlyById = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds/${id}`).then(res => res.json()) 
}

export const getAllItemTypes = () => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/itemTypes`).then(res => res.json())
}

export const uploadClassified = (newClassified, newClassifiedImages) => {
    const classifiedObj = { ...newClassified }

    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(classifiedObj)
    })
        .then(response => response.json())
        .then(newClassifiedResponse => {
            const classifiedId = newClassifiedResponse.id

            if (newClassifiedImages.length === 0) {
                newClassifiedImages = [{
                    classifiedId: classifiedId,
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png',
                }];
            }

            const imageUploadPromises = newClassifiedImages.map(imgObj => {
                const imgObjCopy = { ...imgObj, classifiedId: classifiedId }
                return fetch(`https://dentside-rides-api-copy.onrender.com/classifiedImages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(imgObjCopy)
                });
            });

            return Promise.all(imageUploadPromises)
        });
}

export const uploadClassifiedChanges = (classified, classifiedImages) => {
    const classifiedObj = { ...classified }

    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds/${classified.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(classifiedObj)
    })
        .then(response => response.json())
        .then(classifiedResponse => {
            const classifiedId = classifiedResponse.id

            const imageUploadPromises = classifiedImages.map(imgObj => {
                if (imgObj.url) {
                    if (imgObj.id > 0) {
                        const imgObjCopy = { ...imgObj, classifiedId: classifiedId }

                        return fetch(`https://dentside-rides-api-copy.onrender.com/classifiedImages/${imgObj.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(imgObjCopy)
                        });
                    } else if (imgObj.id === 0) {
                        const imgObjCopy = { ...imgObj, classifiedId: classifiedId }
    
                        return fetch(`https://dentside-rides-api-copy.onrender.com/classifiedImages`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(imgObjCopy)
                        });
                    } else {
                        console.log("THERE WAS AN ERROR AT classifiedService uploadClassifiedChanges()")
                    }
                } else if (imgObj.id > 0 && imgObj.url == "") {
                    return fetch(`https://dentside-rides-api-copy.onrender.com/classifiedImages/${imgObj.id}`, {
                        method: "DELETE",
                    })
                }
                return Promise.resolve()
            });

            return Promise.all(imageUploadPromises)
        });
}

export const deleteClassified = (id) => {
    return fetch(`https://dentside-rides-api-copy.onrender.com/classifieds/${id}`, {
        method: "DELETE",
    })
}