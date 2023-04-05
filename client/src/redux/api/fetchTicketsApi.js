import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/tickets`,
})

export const fetchTicketsApi = createApi({
    reducerPath: 'fetchTicketsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getTickets: build.query({
            query: () => `/`,
        }),
    })
});

export const {
    useGetTicketsQuery
} = fetchTicketsApi;