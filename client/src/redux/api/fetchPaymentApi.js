import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/payments`,
    prepareHeaders: (headers, { getState }) => {
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
    })
});

export const {
    useLazyCheckPaymentQuery
} = fetchPaymentApi;