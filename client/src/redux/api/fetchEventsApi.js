import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/events`,
    credentials: "include",
    prepareHeaders: (headers, {endpoint}) => {
        if (endpoint.includes("/poster")) {
            headers.set("Content-Type", "multipart/form-data");
        }
        return headers;
    },
})

export const fetchEventsApi = createApi({
    reducerPath: 'fetchEventsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getEventInfo: build.query({
            query: (id) => `/${+id}`,
        }),
        createEvent: build.mutation({
            query: (event) => ({
                url: `/`, 
                method:"POST",
                body: event
            })
        }),
        uploadPoster: build.mutation({
            query: ({file, id}) => ({
                url: `/${id}/poster`,
                method: 'POST',
                body: file
            })
        }),
        
    })
});

export const {
    useGetEventInfoQuery,
    useUploadPosterMutation,
    useCreateEventMutation
} = fetchEventsApi;