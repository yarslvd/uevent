import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./slices/authSlice";
import { fetchEventsApi } from "./api/fetchEventsApi";
import { fetchCommentsApi } from "./api/fetchCommentsApi";
import { fetchTicketsApi } from './api/fetchTicketsApi';

export default configureStore({
    reducer: {
        auth: authReducer,
        [fetchEventsApi.reducerPath]: fetchEventsApi.reducer,
        [fetchCommentsApi.reducerPath]: fetchCommentsApi.reducer,
        [fetchTicketsApi.reducerPath]: fetchTicketsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(fetchEventsApi.middleware, fetchCommentsApi.middleware, fetchTicketsApi.middleware),
});
