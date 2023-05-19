import { IEvent } from "../../pages/api/models/event";
import { emptySplitApi } from "../emptySplitApi";

export const eventsEmptyApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IEvent[], void>({
      query: () => "/event",
      providesTags: ["Events"],
    }),
    addEvent: build.mutation<IEvent, IEvent>({
      query(body) {
        return {
          url: "/event",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Events"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetEventsQuery, useAddEventMutation } = eventsEmptyApi;
