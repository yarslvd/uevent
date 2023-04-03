import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";
import Cookies from "js-cookie";

const authAxios = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
    withCredentials: true,
  });
  
authAxios.interceptors.request.use((config) => {
    config.headers.Authorization = Cookies.get("access_token");
    return config;
});

const userToken = Cookies.get("access_token") ? Cookies.get("access_token") : null;

export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await authAxios.post("/api/auth/login", params);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data.error);
      }
    }
);

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async (userToken, { rejectWithValue }) => {
      try {
        const { data } = await authAxios.get("/api/auth/getMe", userToken);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
);

export const fetchSignup = createAsyncThunk(
    "auth/fetchSignup",
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await authAxios.post("/api/auth/register", params);
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data.error);
      }
    }
);

const initialState = {
    userInfo: null,
    userToken,
    error: null,
    status: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            //LOGIN
            .addCase(fetchLogin.pending, (state) => {
                state.userInfo = null;
                state.userToken = null;
                state.status = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.userToken = action.payload.token;
                state.status = "resolved";
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.userInfo = null;
                state.userToken = null;
                state.error = action.payload;
                state.status = "rejected";
            })

            //GET ME
            .addCase(fetchAuthMe.pending, (state) => {
                state.userInfo = null;
                state.status = "loading";
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.status = "resolved";
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.userInfo = null;
                state.status = "rejected";
            })

            //REGISTER
            .addCase(fetchSignup.pending, (state) => {
                state.userInfo = null;
                state.status = "loading";
            })
            .addCase(fetchSignup.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.status = "resolved";
            })
            .addCase(fetchSignup.rejected, (state, action) => {
                state.userInfo = null;
                console.log(action.payload);
                state.error = action.payload;
                state.status = "rejected";
            })
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.userToken);
export const selectIsAuthMe = (state) => Boolean(state.auth.userInfo);

export const authReducer = authSlice.reducer;