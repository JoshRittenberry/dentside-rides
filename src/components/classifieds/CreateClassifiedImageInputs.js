export const CreateClassifiedImageInputs = ({ newClassifiedImages, setNewClassifiedImages }) => {
    return (
        <>
            {newClassifiedImages.map((classifiedImageObj, index) => {
                return (
                        <input
                            key={index}
                            className="create-classified-image-url"
                            type="url"
                            placeholder={`Add Image Url #${index + 1}`}
                            value={newClassifiedImages[index]?.url}
                            onChange={event => {
                                event.preventDefault()
                                const classifiedImagesCopy = [...newClassifiedImages] // Copy the array
                                classifiedImagesCopy[index] = {
                                    ...classifiedImagesCopy[index],
                                    url: event.target.value
                                }
                                setNewClassifiedImages(classifiedImagesCopy)
                            }}
                        />
                )
            })}
        </>
    )
}