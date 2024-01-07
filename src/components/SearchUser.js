import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "../utils/helperFunction";

const SearchUser = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const location = useLocation();
    const [showError, setShowError] = useState(false);

    const searchQuery = getQueryParams(location.search, 'search_query');
    const error = getQueryParams(location.search, 'error');

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchValue.length > 0) {
            navigate(`/user?search_query=${encodeURIComponent(searchValue)}`);
        }
    };

    const handleChange = (event) => {
        const query = event.target.value?.trim();
        setSearchValue(query);
        navigate(`?search_query=${encodeURIComponent(query)}`);
        setShowError(false)
    };

    useEffect(() => {
        if (searchQuery?.length > 0 && error?.length > 0) {
            setShowError(true);
            setSearchValue(searchQuery);
        }
    }, [searchQuery, error]);

    return (
        <div className="flex flex-col justify-center items-center text-center gap-5 w-full h-fit pt-[20vh]">
            <h1 className="text-3xl font-medium font-mono">Enter GitHub username</h1>
            <input
                type="text"
                placeholder="ex. t3dotgg"
                className="border-transparent font-mono focus:border-transparent focus:ring-0 focus:outline-none w-[200px] max-w-1/5 h-10 rounded-md ml-4 p-2"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={searchValue}
            />
            {showError && <p className="text-red-500">No user found from {searchQuery} Id</p>}
        </div>
    );
};

export default SearchUser;
