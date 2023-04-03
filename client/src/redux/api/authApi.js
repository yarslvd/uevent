import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/authSlice';
import { setUser } from '../features/userSlice';
import Cookies from "js-cookie";

const getAccessToken = () => Cookies.get('access_token');

const refreshAccessToken = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to refresh access token');
    }
    Cookies.set('access_token', data.accessToken);
    return data.accessToken;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        console.log(headers, getState());
        const token = getState().auth.token;
        if(token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        console.log(headers);
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);

    if(result?.error?.originalStatus === 403) {
        console.log('send refresh token');
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
        if(refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data, user}));
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            api.dispatch(logOut());
        }
    }
    return result;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    // baseQuery: fetchBaseQuery({
    //     baseUrl: 'http://localhost:4000/api/auth',
    //     mode: 'cors'
    // }),
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getMe: builder.query({
            query() {
              return {
                url: 'getMe',
                credentials: 'include',
              };
            },
            transformResponse: (result) =>
              result,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                dispatch(setUser(data));
              } catch (error) {}
            },
          }),
        registerUser: builder.mutation({
            query(data) {
                return {
                    url: 'register',
                    method: 'POST',
                    body: data,
                };
            }
        }),
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                };  
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    console.log(authApi.endpoints);
                    await dispatch(authApi.endpoints.getMe.initiate(null));
                }
                catch(err) {}
            }
        }),
        
    })
});

// authApi.middleware.use(async (req, next) => {
//     const result = await next(req);
//     if (result.error?.status === 401) {
//       try {
//         // Attempt to refresh the access token
//         const accessToken = await refreshAccessToken();
//         // Update the original request headers with the new access token
//         req.headers.set('Authorization', `Bearer ${accessToken}`);
//         // Re-send the original request with the updated headers
//         return next(req);
//       } catch (error) {
//         // If refreshing the access token fails, log out the user
//         // or show an error message
//         // ...
//       }
//     }
//     return result;
// });

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetMeMutation,
} = authApi;
  