import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/tickets`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchTicketsApi = createApi({
    reducerPath: 'fetchTicketsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getTickets: build.query({
            query: ({ user_id }) => ({
                url: `?user_id=${user_id}`,
                method: 'GET',
            })
        }),
        buyTickets: build.query({
            query: (ticket) => ({
                url: `/`, 
                method:"POST",
                body: ticket
            })
        }),
    })
});

export const {
    useGetTicketsQuery,
    useLazyBuyTicketsQuery
} = fetchTicketsApi;