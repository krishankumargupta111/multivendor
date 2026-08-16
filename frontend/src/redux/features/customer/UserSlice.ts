import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "api/users";

// ================= TYPES =================

interface User {
  _id?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  role?: string;
  profilePicture?: string;

  [key: string]: any;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// ================= FETCH USER PROFILE =================

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/users/fetchUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("response", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= INITIAL STATE =================

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// ================= SLICE =================

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ================= PENDING =================

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ================= SUCCESS =================

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // ================= ERROR =================

      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;