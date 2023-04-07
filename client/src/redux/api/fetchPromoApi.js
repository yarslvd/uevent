import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/promo`,
})

export const fetchTicketsApi = createApi({
    reducerPath: 'fetchPromoApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        addPromos: build.mutation({
            query: (promos) => ({
                url: `/`, 
                method:"POST",
                body: promos
            })
        }),
    })
});

export const {
    useGetTicketsQuery
} = fetchTicketsApi;