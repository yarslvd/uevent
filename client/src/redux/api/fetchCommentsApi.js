import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/comments`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchCommentsApi = createApi({
    reducerPath: 'fetchCommentsApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getEventComments: build.query({
            query: ({id, page}) => `?event_id=${id}&limit=5&page=${page}`
        }),
        addEventComment: build.mutation({
            query: (obj) => ({
                url: '/',
                method: 'POST',
                body: obj
            })
        })
    })
});

export const {
    useGetEventCommentsQuery,
    useAddEventCommentMutation
} = fetchCommentsApi;