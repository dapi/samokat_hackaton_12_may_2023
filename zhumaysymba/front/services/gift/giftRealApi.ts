import { Gift } from "../../pages/api/models/gift";
import { realSplitApi } from "../realSplitApi";

export const giftRealApi = realSplitApi.injectEndpoints({
    endpoints: (build) => ({
        getGifts: build.query<Gift[], string>({
            query: () => `/gift`,
            providesTags: ["Gifts"]
        }),
        buyGift: build.mutation<any, any>({
            query(body) {
              return {
                url: "/gift/buy",
                method: "POST",
                body,
              };
            },
            invalidatesTags: ["Gifts", "Employee"],
          }),
    }),
    overrideExisting: true
})

export const { useGetGiftsQuery, useBuyGiftMutation } = giftRealApi;