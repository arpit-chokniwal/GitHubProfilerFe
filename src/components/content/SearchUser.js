import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetGithubUserDetailQuery } from "../../redux/api/githubProfilerSlice";

const SearchUser = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState(false);

    const [
        getGitUser,
        {
            data: gitUserData,
            isSuccess: gitUserSuccess,
            isLoading: gitUserLoading,
            isError: gitUserError,
            error: gitUserErrorMessage,
        },
    ] = useLazyGetGithubUserDetailQuery();

    useEffect(() => {
        console.log({
            gitUserError,
            gitUserSuccess,
            gitUserLoading,
            gitUserErrorMessage,
            gitUserData,
        });
    }, [gitUserSuccess, gitUserError]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchValue.length > 0) {
            console.log("You hit search for", searchValue);
            getGitUser({ githubUserId: searchValue });
            // setError(true);
        } else {
            setError(false);
        }
    };

    const handleChange = (event) => {
        const query = event.target.value;
        setSearchValue(query.trim());
        navigate(`?search_query=${encodeURIComponent(query)}`);
    };

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
            {error && (
                <h4>
                    Can't find user{" "}
                    <code className="px-2 py-1 border rounded-sm border-black">
                        {searchValue}
                    </code>
                    , Check spelling.
                </h4>
            )}
        </div>
    );
};

export default SearchUser;
