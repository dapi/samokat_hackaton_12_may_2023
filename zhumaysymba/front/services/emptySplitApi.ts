import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//https://samokat.somnoynadno.ru/api/v1/
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ["News", "Gifts", "Achievements", "Employee", "Events", "Units", "Tasks"],
    endpoints: () => ({}),
})
