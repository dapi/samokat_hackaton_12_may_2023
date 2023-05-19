import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// https://samokat.somnoynadno.ru/api/v
// http://localhost:3000/api

export const realSplitApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://samokat.somnoynadno.ru/api/v1' }),
    tagTypes: ["News", "Gifts", "Achievements", "Employee", "Events", "Units", "Tasks"],
    endpoints: () => ({}),
})
