import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/comments`,
})

export const fetchCommentsApi = createApi({
    reducerPath: 'fetchCommentsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getEventComments: build.query({
            query: (id) => `/${+id}`,
        }),
    })
});

export const {
    useGetEventCommentsQuery
} = fetchCommentsApi;