import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/organizers`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchOrganizersApi = createApi({
    reducerPath: 'fetchOrganizersApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        newOrganization: build.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body: body
            })
        }),
    })
});

export const {
    useNewOrganizationMutation,
} = fetchOrganizersApi;