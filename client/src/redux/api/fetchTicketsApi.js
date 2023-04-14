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
            query: () => `/user-tickets`
        }),
        getEventTickets: build.query ({
            query: ({event_id}) => ({
                url: `/`,
                method:"GET",
                params:{
                    event_id:event_id
                }
            }),
        }),
        buyTickets: build.query({
            query: (ticket) => ({
                url: `/`, 
                method:"POST",
                body: ticket
            })
        }),
        buyTicketsUnauth: build.query({
            query: (ticket) => ({
                url: `/unauthorized`, 
                method:"POST",
                body: ticket
            })
        }),
    })
});

export const {
    useGetTicketsQuery,
    useGetEventTicketsQuery,
    useLazyBuyTicketsQuery,
    useLazyBuyTicketsUnauthQuery
} = fetchTicketsApi;