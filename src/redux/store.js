import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubProfilerAPI } from "./api/githubProfilerSlice";

export const store = configureStore({
    reducer: {
        [githubProfilerAPI.reducerPath]: githubProfilerAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubProfilerAPI.middleware),
});
setupListeners(store.dispatch);
