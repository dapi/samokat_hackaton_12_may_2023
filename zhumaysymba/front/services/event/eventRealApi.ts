import { IEvent } from "../../pages/api/models/event";
import { realSplitApi } from "../realSplitApi";

type ExcludeKeys = "ID" | "IsActive";

export type EventRequest = Omit<IEvent, keyof ExcludeKeys>;

export const eventsRealApi = realSplitApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IEvent[], void>({
      query: () => "/event",
      providesTags: ["Events"],
    }),
    getEvent: build.query<IEvent, string>({
      query: (ID) => `/event/${ID}`,
    }),
    addEvent: build.mutation<IEvent, EventRequest>({
        query(body) {
          return {
            url: "/event",
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Events"],
      }),
      editEvent: build.mutation<IEvent, EventRequest>({
        query(data) {
            const { ID, ...body} = data;
            return {
                url: `/event/${ID}`,
                method: "PUT",
                body
            }
        },
        invalidatesTags: ["Events"]
    }),
      deleteEvent: build.mutation<void, number>({
        query(ID) {
            return {
                url: `/event/${ID}`,
                method: "DELETE",
            }
        },
        invalidatesTags: ["Events"]
    }),
  }),
  overrideExisting: true,
});

export const { useGetEventsQuery, useGetEventQuery, useAddEventMutation, useEditEventMutation, useDeleteEventMutation } = eventsRealApi;