import { NewsRequest } from "../../pages/admin-panel/news/create";
import { News } from "../../pages/api/models/news";
import { emptySplitApi } from "../emptySplitApi";

export const newsEmptyApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getNews: build.query<News[], void>({
            query: () => "/news",
            providesTags: ["News"]
        }),
        getNewsSingle: build.query<News, string>({
            query: (ID) => `/news/${ID}`,
        }),
        addNews: build.mutation<News, NewsRequest>({
            query(body) {
              return {
                url: "/news",
                method: "POST",
                body,
              };
            },
            invalidatesTags: ["News"],
          }),
    }),
    overrideExisting: true
})

export const { useGetNewsQuery, useAddNewsMutation, useGetNewsSingleQuery } = newsEmptyApi;