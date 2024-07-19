import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Comments, CommentsState } from "../../types/types";

const initialState: CommentsState = {
  entities: [],
  loading: "idle",
  error: null,
};

export const fetchComments = createAsyncThunk("/fetchComments", async () => {
  const response = await axios.get("https://sandbox.creos.me/api/v1/comment/");
  return response.data;
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comments[]>) => {
          state.loading = "succeeded";
          state.entities = action.payload;
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default commentsSlice.reducer;
