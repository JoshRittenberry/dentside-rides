export const getAllClassifieds = () => {
    return fetch(`http://localhost:8088/classifieds?_expand=itemType&_expand=user&_embed=classifiedImages`).then(res => res.json())
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
    }).then(() => {
        newClassifiedImages.map(imgObj => {
            let allClassifiedsLength = 0
            
            getAllClassifieds().then(allClassifieds => {
                allClassifiedsLength = allClassifieds.length
                const imgObjCopy = { ...imgObj }
                imgObjCopy.classifiedId = allClassifiedsLength

                if (imgObj.url) {
                    return fetch(`http://localhost:8088/classifiedImages`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(imgObjCopy)
                    })
                }
            })
        })
    })

}