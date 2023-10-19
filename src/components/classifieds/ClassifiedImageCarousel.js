import { useEffect, useState } from "react"

export const ClassifiedImageCarousel = ({ newClassifiedImages }) => {
    const [imageArray, setImageArray] = useState([])

    useEffect(() => {
        const newImageArray = newClassifiedImages.filter(imageObj => imageObj.url)
        setImageArray(newImageArray)
    }, [newClassifiedImages])

    return (
        <div id="create-classified-carousel" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                {imageArray.map((image, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#create-classified-carousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {imageArray.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={image.url} className="d-block w-100" alt={`Slide Image ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#create-classified-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#create-classified-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
