import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/auth`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchAuthApi = createApi({
    reducerPath: 'fetchAuthApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        updateUser: build.mutation({
            
        })
    })
});

export const {

} = fetchAuthApi;