import { Task } from "../../pages/api/models/task";
import { emptySplitApi } from "../emptySplitApi";

export const taskEmptyApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => "/task",
            providesTags: ["Tasks"]
        }),
    }),
    overrideExisting: true
})

export const { useGetTasksQuery } = taskEmptyApi;