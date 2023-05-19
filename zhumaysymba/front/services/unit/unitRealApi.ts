import { Unit } from "../../pages/api/models/unit";
import { realSplitApi } from "../realSplitApi";

const endpoint = "unit";

export const unitRealApi = realSplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUnits: build.query<Unit[], void>({
            query: () => `/${endpoint}`,
            providesTags: ["Units"]
        }),
        getUnit: build.query<Unit, string>({
            query: (ID) => `/${endpoint}/${ID}`,
        }),
        addUnit: build.mutation<void, Unit>({
            query(body) {
                return {
                    url: `/${endpoint}`,
                    method: "POST",
                    body
                }
            },
            invalidatesTags: ["Units"]
        }),
        editUnit: build.mutation<Unit, Unit>({
            query(data) {
                const { ID, ...body} = data;
                return {
                    url: `/${endpoint}/${ID}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["Units"]
        }),
        deleteUnit: build.mutation<void, string>({
            query(ID) {
                return {
                    url: `/${endpoint}/${ID}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Units"]
        }),
    }),
    overrideExisting: true
})

export const { useGetUnitQuery, useGetUnitsQuery } = unitRealApi;
