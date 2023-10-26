export const getAllClassifieds = () => {
    return fetch(`http://localhost:8088/classifieds?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
}

export const getClassifiedById = (id) => {
    return fetch(`http://localhost:8088/classifieds/${id}?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
}

export const getClassifiedOnlyById = (id) => {
    return fetch(`http://localhost:8088/classifieds/${id}`).then(res => res.json()) 
}

export const getAllItemTypes = () => {
    return fetch(`http://localhost:8088/itemTypes`).then(res => res.json())
}

export const uploadClassified = (newClassified, newClassifiedImages) => {
    const classifiedObj = { ...newClassified }

    return fetch(`http://localhost:8088/classifieds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(classifiedObj)
    })
        .then(response => response.json())
        .then(newClassifiedResponse => {
            const classifiedId = newClassifiedResponse.id

            const imageUploadPromises = newClassifiedImages.map(imgObj => {
                if (imgObj.url) {
                    const imgObjCopy = { ...imgObj, classifiedId: classifiedId }

                    return fetch(`http://localhost:8088/classifiedImages`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(imgObjCopy)
                    });
                }
                return Promise.resolve()
            });

            return Promise.all(imageUploadPromises)
        });
}

export const uploadClassifiedChanges = (classified, classifiedImages) => {
    const classifiedObj = { ...classified }

    return fetch(`http://localhost:8088/classifieds/${classified.id}`, {
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

                        return fetch(`http://localhost:8088/classifiedImages/${imgObj.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(imgObjCopy)
                        });
                    } else if (imgObj.id === 0) {
                        const imgObjCopy = { ...imgObj, classifiedId: classifiedId }
    
                        return fetch(`http://localhost:8088/classifiedImages`, {
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
                    return fetch(`http://localhost:8088/classifiedImages/${imgObj.id}`, {
                        method: "DELETE",
                    })
                }
                return Promise.resolve()
            });

            return Promise.all(imageUploadPromises)
        });
}

export const deleteClassified = (id) => {
    return fetch(`http://localhost:8088/classifieds/${id}`, {
        method: "DELETE",
    })
}