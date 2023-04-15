import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/subscriptions`,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchSubscriptionApi = createApi({
    reducerPath: 'fetchSubscriptionApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getSubscriptions: build.query({
            query: () => '/'
        }),
        addSubscription: build.mutation({
            query: (organizer_id) => ({
                url: '/',
                method: 'POST',
                body: organizer_id
            })
        }),
        deleteSubscription: build.mutation({
            query: (organizer_id) => ({
                url: `/${organizer_id}`,
                method: 'DELETE',
            })
        }),
        getSubscriptionOne: build.query({
            query: ({organizer_id, user_id}) => ({
                url: '/check',
                params: {
                    organizer_id: organizer_id,
                    user_id: user_id
                }
            })
        }),
        getProfileSubscriptions: build.query({
            query: (user_id, limit, page) => `/?user_id=${user_id}&limit=${limit}&page=${page}`
        })
    })
});

export const {
    useGetSubscriptionsQuery,
    useAddSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSubscriptionOneQuery,
    useGetProfileSubscriptionsQuery
} = fetchSubscriptionApi;