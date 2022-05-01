import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAccount, signIn, logout, getMe } from "../../http/index";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signIn(data);
      if (response.data && response.data.user) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/create-account",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAccount(data);
      console.log(response.data)
      if (response.data && response.data.user) {
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      const response = await logout();
      if (response.data && response.data.user) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const currentUser = createAsyncThunk("users/me", async (thunkAPI) => {
  try {
    const response = await getMe();
    if (response.data && response.data.user) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    throw thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("onquity_user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("onquity_user");
      sessionStorage.removeItem("access_token");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.setItem("onquity_user", JSON.stringify(action.payload.user));
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      sessionStorage.setItem("access_token", action.payload.accessToken);
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.setItem("onquity_user", JSON.stringify(action.payload.user));
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      sessionStorage.setItem("access_token", action.payload.accessToken);
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [currentUser.pending]: (state) => {
      state.loading = true;
    },
    [currentUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [currentUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [signOut.pending]: (state) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("onquity_user");
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("access_token");
      state.user = null;
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
