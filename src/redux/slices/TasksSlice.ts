import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Tasks, TasksState } from "../../types/types";

const initialState: TasksState = {
  entities: [],
  loading: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("/fetchTasks", async () => {
  const response = await axios.get("https://sandbox.creos.me/api/v1/issue/");
  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<Tasks[]>) => {
          state.loading = "succeeded";
          state.entities = action.payload;
        }
      )
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default tasksSlice.reducer;
