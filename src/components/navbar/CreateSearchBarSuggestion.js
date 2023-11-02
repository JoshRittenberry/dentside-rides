import { useNavigate } from "react-router-dom"

export const CreateSearchBarSuggestion = ({ resultObject, setSearchTerm, setInputFocused }) => {
    const navigate = useNavigate()

    // If resultObject is a post
    if (`postDate` in resultObject) {
        console.log("we are in CreateResult() and the current object is a post", resultObject)
        return (
            <a key={resultObject.id} className='search_suggestion_line' onMouseDown={event => {
                event.preventDefault()
                navigate(`/posts/${resultObject.id}`)
                setSearchTerm("")
                setInputFocused(false)
            }}>
                {resultObject.title}
            </a>
        )
    }

    // If resultObject is a classified
    else if (`classifiedDate` in resultObject) {
        console.log("we are in CreateResult() and the current object is a classified", resultObject)
        return (
            <a key={resultObject.id} className='search_suggestion_line' onMouseDown={event => {
                event.preventDefault()
                navigate(`/classifieds/${resultObject.id}`)
                setSearchTerm("")
                setInputFocused(false)
            }}>
                {resultObject.title}
            </a>
        )
    }

    // If resultObject is an event
    else if (`eventStartDate` in resultObject) {
        console.log("we are in CreateResult() and the current object is an event", resultObject)
        return (
            <a key={resultObject.id} className='search_suggestion_line' onMouseDown={event => {
                event.preventDefault()
                navigate(`/events/${resultObject.id}`)
                setSearchTerm("")
                setInputFocused(false)
            }}>
                {resultObject.title}
            </a>
        )
    }

    // If resultObject is a user
    else if (`email` in resultObject) {
        console.log("we are in CreateResult() and the current object is a user", resultObject)
        return (
            <a key={resultObject.id} className='search_suggestion_line' onMouseDown={event => {
                event.preventDefault()
                navigate(`/user_account/${resultObject.id}`)
                setSearchTerm("")
                setInputFocused(false)
            }}>
                {resultObject.username}
            </a>
        )
    }

}