import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/events`,
})

export const fetchEventsApi = createApi({
    reducerPath: 'fetchEventsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getEventInfo: build.query({
            query: (id) => `/${+id}`,
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
    useUploadPosterMutation
} = fetchEventsApi;