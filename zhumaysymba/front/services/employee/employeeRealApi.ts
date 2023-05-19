import { Employee } from "../../pages/api/models/employee";
import { realSplitApi } from "../realSplitApi";

const endpoint = "employee";

export const employeeRealApi = realSplitApi.injectEndpoints({
    endpoints: (build) => ({
        getEmployees: build.query<Employee[], void>({
            query: () => `/${endpoint}`,
            providesTags: ["Employee"]
        }),
        getEmployee: build.query<Employee, string>({
            query: (ID) => `/${endpoint}/${ID}`,
            providesTags: ["Employee"]
        }),
        addEmployee: build.mutation<void, Employee>({
            query(body) {
                return {
                    url: `/${endpoint}`,
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["Employee"]
        }),
        editEmployee: build.mutation<Employee, Employee>({
            query(data) {
                const { ID, ...body} = data;
                return {
                    url: `/${endpoint}/${ID}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Employee"]
        }),
        deleteEmployee: build.mutation<void, string>({
            query(ID) {
                return {
                    url: `/${endpoint}/${ID}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Employee"]
        }),
    }),
    overrideExisting: true
})

export const { useGetEmployeeQuery } = employeeRealApi;