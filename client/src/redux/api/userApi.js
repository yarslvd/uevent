import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:4000/api/users/`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
      getMe: builder.query({
        query() {
          return {
            url: 'me',
            credentials: 'include',
          };
        },
        transformResponse: (result) =>
          result.data.user,
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setUser(data));
          } catch (error) {}
        },
      }),
    }),
});