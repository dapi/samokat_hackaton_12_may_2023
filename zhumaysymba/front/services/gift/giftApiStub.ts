import { Gift } from "../../pages/api/models/gift";
import { emptySplitApi } from "../emptySplitApi";

export const giftEmptyApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getGifts: build.query<Gift[], void>({
            query: () => `/gift`,
            providesTags: ["Gifts"]
        }),
    }),
    overrideExisting: true
})

export const { useGetGiftsQuery } = giftEmptyApi;