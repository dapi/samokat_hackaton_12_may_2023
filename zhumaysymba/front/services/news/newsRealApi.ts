import { NewsRequest } from "../../pages/admin-panel/news/create";
import { News } from "../../pages/api/models/news";
import { realSplitApi } from "../realSplitApi";

export const newsRealApi = realSplitApi.injectEndpoints({
    endpoints: (build) => ({
        getNews: build.query<News[], void>({
            query: () => "/news",
            providesTags: ["News"]
        }),
        getNewsSingle: build.query<News, string>({
            query: (ID) => `/news/${ID}`,
            providesTags: ["News"]
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
          editNews: build.mutation<News, News>({
            query(data) {
            const { ID, ...body} = data;
              return {
                url: `/news/${ID}`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["News"],
          }),
        deleteNews: build.mutation<void, number>({
            query(ID) {
                return {
                    url: `/news/${ID}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["News"]
        }),
    }),
    overrideExisting: true
})
export const { useGetNewsQuery, useGetNewsSingleQuery, useAddNewsMutation, useEditNewsMutation, useDeleteNewsMutation } = newsRealApi;
