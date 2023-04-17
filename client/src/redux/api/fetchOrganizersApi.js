import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/organizers`,
    credentials: "same-origin",
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
        updateOrganization: build.mutation({
            query: ({id, body}) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: body
            })
        }),
        uploadAvatar: build.mutation({
            query: ({file, id}) => ({
                url: `/${id}/avatar`,
                method: 'POST',
                body: file
            })
        }),
        getOrganization: build.query({
            query: (id) => `/${id}`
        }),
    })
});

export const {
    useNewOrganizationMutation,
    useUpdateOrganizationMutation,
    useUploadAvatarMutation,
    useGetOrganizationQuery,
} = fetchOrganizersApi;