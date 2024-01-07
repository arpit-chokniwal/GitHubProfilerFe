import React from "react";

const LandingPage = () => {
    return (
        <div className="w-full h-full flex justify-center pt-[30vh]">
            <h1 className="text-3xl font-medium font-mono">Enter GitHub username</h1>
            <input
                type="text"
                placeholder="ex. t3dotgg"
                className="border-transparent focus:border-transparent focus:ring-0 focus:outline-none w-1/5 h-10 rounded-md ml-4 p-2"
            />
        </div>
    );
};

export default LandingPage;
