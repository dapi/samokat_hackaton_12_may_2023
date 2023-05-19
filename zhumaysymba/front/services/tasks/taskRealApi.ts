import { Task } from "../../pages/api/models/task";
import { realSplitApi } from "../realSplitApi";

export type TaskRequest = Omit<Task, "ID">;

export const taskRealApi = realSplitApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Task[], void>({
            query: () => "/task",
            providesTags: ["Tasks"]
        }),
        getTask: build.query<Task, number>({
          query: (id) => `/task/${id}`,
          providesTags: ["Tasks"]
      }),
        addTask: build.mutation<Task, TaskRequest>({
            query(body) {
              return {
                url: "/task",
                method: "POST",
                body,
              };
            },
            invalidatesTags: ["Tasks"],
          }),
          startTask: build.mutation<Task, any>({
            query(body) {
              return {
                url: `/task/start`,
                method: "POST",
                body
              };
            },
            invalidatesTags: ["Tasks", "Employee"],
          }),
          deleteTask: build.mutation<void, number>({
            query(ID) {
                return {
                    url: `/task/${ID}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Tasks"]
          }), 
          editTask: build.mutation<Task, Task>({
            query(data) {
            const { ID, ...body} = data;
              return {
                url: `/task/${ID}`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Tasks"],
          }),
          delTask: build.mutation<void, number>({
            query(ID) {
                return {
                    url: `/task/${ID}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Tasks"]
          }),
    }),
    overrideExisting: true
})

export const { useGetTasksQuery, useGetTaskQuery, useStartTaskMutation, useAddTaskMutation, useEditTaskMutation, useDelTaskMutation } = taskRealApi;