import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/favourites`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
})

export const fetchFavouritesApi = createApi({
    reducerPath: 'fetchFavouritesApi',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getFavourites: build.query({
            query: () => '/'
        }),
        addFavourite: build.mutation({
            query: (event_id) => ({
                url: '/',
                method: 'POST',
                body: event_id
            })
        }),
        deleteFavourite: build.mutation({
            query: (event_id) => ({
                url: `/${event_id}`,
                method: 'DELETE',
            })
        }),
        getFavouriteOne: build.query({
            query: (event_id) => `/${event_id}`
        })
    })
});

export const {
    useGetFavouritesQuery,
    useAddFavouriteMutation,
    useDeleteFavouriteMutation,
    useGetFavouriteOneQuery
} = fetchFavouritesApi;