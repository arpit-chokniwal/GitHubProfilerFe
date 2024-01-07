import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GITHUB_BASE_URL } from "../../constant";

const baseUrl = GITHUB_BASE_URL;


export const githubProfilerAPI = createApi({
    reducerPath: "githubProfilerAPI",
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getGithubUserDetail: builder.query({
            query: ({ githubUserId }) => ({
                url: `/${githubUserId}`,
                method: "GET"
            })
        }),
    }),
});

export const { useLazyGetGithubUserDetailQuery } = githubProfilerAPI;
