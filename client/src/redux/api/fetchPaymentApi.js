import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/payments`,
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
        if(endpoint.includes('/unauthorized')) {
            return headers;
        }
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchPaymentApi = createApi({
    reducerPath: 'fetchPaymentApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        checkPayment: build.query({
            query: (id) => ({
                url: `/` + id, 
                method:"GET"
            })
        }),
        checkPaymentUnauth: build.mutation({
            query: (obj) => ({
                url: `/${obj.id}/unauthorized?orderId=${obj.orderId}`, 
                method:"GET"
            })
        }),
    })
});

export const {
    useLazyCheckPaymentQuery,
    useCheckPaymentUnauthMutation
} = fetchPaymentApi;