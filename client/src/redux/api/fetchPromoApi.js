import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/promos`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchPromoApi = createApi({
    reducerPath: 'fetchPromoApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        addPromo: build.mutation({
            query: (obj) => ({
                url: `/`, 
                method:"POST",
                body: obj
            })
        }),
        deletePromo: build.mutation({
            query: (promoText) => ({
                url: `/${promoText}`, 
                method:"DELETE"
            })
        }),
        validatePromo: build.mutation({
            query: (obj) => ({
                url: '/validate',
                method:"POST",
                body: obj
            })
        })
    })
});

export const {
    useAddPromoMutation,
    useDeletePromoMutation,
    useValidatePromoMutation
} = fetchPromoApi;