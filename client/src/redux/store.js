import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./slices/authSlice";
import { fetchEventsApi } from "./api/fetchEventsApi";
import { fetchCommentsApi } from "./api/fetchCommentsApi";
import { fetchTicketsApi } from './api/fetchTicketsApi';
import { fetchPromoApi } from './api/fetchPromoApi';
import { fetchAuthApi } from './api/fetchAuthApi';
import { fetchPaymentApi } from './api/fetchPaymentApi';
import { fetchFavouritesApi } from './api/fetchFavouritesApi';
import { fetchOrganizersApi } from './api/fetchOrganizersApi';
import {fetchSubscriptionApi} from "./api/fetchSubscriptionsApi";

export default configureStore({
    reducer: {
        auth: authReducer,
        [fetchEventsApi.reducerPath]: fetchEventsApi.reducer,
        [fetchCommentsApi.reducerPath]: fetchCommentsApi.reducer,
        [fetchTicketsApi.reducerPath]: fetchTicketsApi.reducer,
        [fetchPromoApi.reducerPath]: fetchPromoApi.reducer,
        [fetchAuthApi.reducerPath]: fetchAuthApi.reducer,
        [fetchPaymentApi.reducerPath]: fetchPaymentApi.reducer,
        [fetchFavouritesApi.reducerPath]: fetchFavouritesApi.reducer,
        [fetchSubscriptionApi.reducerPath]: fetchSubscriptionApi.reducer,
        [fetchOrganizersApi.reducerPath]: fetchOrganizersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(fetchEventsApi.middleware,
        fetchCommentsApi.middleware, fetchTicketsApi.middleware, fetchPromoApi.middleware, fetchAuthApi.middleware, fetchPaymentApi.middleware,
        fetchFavouritesApi.middleware,fetchSubscriptionApi.middleware, fetchOrganizersApi.middleware),
});
