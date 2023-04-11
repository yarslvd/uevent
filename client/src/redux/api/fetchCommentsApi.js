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
        updateEventComment: build.mutation({
            query: ({id, comment}) => ({
                url: `/${id}`,
                method:"PATCH",
                body: {
                    comment:comment,
                }
            })
        }),
        getEventComments: build.query({
            query: ({id, page}) => `?event_id=${id}&limit=5&page=${page}`
        }),
        addEventComment: build.mutation({
            query: (obj) => ({
                url: '/',
                method: 'POST',
                body: obj
            })
        }),
        deleteEventComment: build.mutation({
            query: ({id}) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    })
});

export const {
    useUpdateEventCommentMutation,
    useGetEventCommentsQuery,
    useAddEventCommentMutation,
    useDeleteEventCommentMutation,
} = fetchCommentsApi;