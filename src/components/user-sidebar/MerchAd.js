import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllClassifieds } from "../../services/classifiedService"
import { Carousel, CarouselItem, UncontrolledCarousel } from "reactstrap"

export const MerchAd = () => {
    const [merch, setMerch] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === merch.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? merch.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const navigate = useNavigate()

    useEffect(() => {
        getAllClassifieds()
            .then(classifiedsArray => {
            const merchItems = classifiedsArray.filter(classified => classified.itemTypeId === 1)
            setMerch(merchItems)
            })
    }, [])

    const navigateToClassified = (merchObjId) => {
        navigate(`/classifieds/${merchObjId}`)

        // I don't remember why I had this here... it seems that after deployment this is causing my localStorage to be cleared based on the useEffect in App.js
        // window.location.reload(false)
    }

    return (
        <Carousel id="merch-carousel"
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={4000}
            ride="carousel"
        >
            {
                merch.map((merchObj, index) => {
                    return (
                        <CarouselItem 
                            onExiting={() => setAnimating(true)}
                            onExited={() => setAnimating(false)}
                            key = {index}
                        >
                            <img src={merchObj.classifiedImages[0].url} alt={merchObj.title} onClick={() => { navigateToClassified(merchObj.id) }} />
                        </CarouselItem>
                    )
                })
            } 
        </Carousel>
    )
}