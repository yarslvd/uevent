import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/events`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
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
        getEvents: build.query({
            query: ({ page }) => `?limit=6&page=${page}`
        })
    })
});

export const {
    useGetEventInfoQuery,
    useUploadPosterMutation,
    useCreateEventMutation,
    useGetEventsQuery
} = fetchEventsApi;