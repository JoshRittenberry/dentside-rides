import React, { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
import "./SearchBar.css";
import { CreateSearchBarSuggestion } from "./CreateSearchBarSuggestion";

export const SearchBar = ({ setSearchTerm, searchTerm, searchBarSuggestions }) => {
    const [isInputFocused, setInputFocused] = useState(false); // New state

    useEffect(() => {
        // ... (this remains unchanged)
    }, [searchTerm])

    return (
        <section className='search_section'>
            <div className='search_input_div'>
                <input
                    type='text'
                    className='search_input'
                    placeholder='Site Search...'
                    autoComplete='off'
                    onChange={event => {
                        setSearchTerm(event.target.value)
                        if (event !== "") {
                            setInputFocused(true)
                        }
                    }}
                    onFocus={() => {
                        if (searchTerm !== "") {
                            setInputFocused(true)
                        }
                    }}
                    onBlur={() => 
                        setInputFocused(false)
                    }
                    value={searchTerm}
                />
            </div>
            {isInputFocused && (  // Conditionally render based on isInputFocused
                <div className='search_result'>
                    {searchBarSuggestions.map((object, index) =>
                        <CreateSearchBarSuggestion key={index} resultObject={object} setSearchTerm={setSearchTerm} setInputFocused={setInputFocused} /> // Added a key prop for optimal rendering
                    )}
                    {searchBarSuggestions.length == 0 && (
                        <a key={0} className='search_suggestion_line'>
                            No Results Found
                        </a>
                    )}
                </div>
            )}
        </section>
    )
}