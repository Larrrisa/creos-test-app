import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Designers, ApiResponse, DesignersState } from "../../types/types";

const initialState: DesignersState = {
  entities: [],
  loading: "idle",
  error: null,
};

const fetchAllDesigners = async () => {
  let allDesigners: any = [];
  let nextUrl = "https://sandbox.creos.me/api/v1/designer/";

  while (nextUrl) {
    const response = await axios.get<ApiResponse>(nextUrl);
    allDesigners = [...allDesigners, ...response.data.results];
    nextUrl = response.data.next;
  }

  return allDesigners;
};

export const fetchDesigners = createAsyncThunk("/fetchDesigners", async () => {
  const response = await fetchAllDesigners();
  return response;
});

const designersSlice = createSlice({
  name: "designers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigners.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchDesigners.fulfilled,
        (state, action: PayloadAction<Designers[]>) => {
          state.loading = "succeeded";
          state.entities = action.payload;
        }
      )

      .addCase(fetchDesigners.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default designersSlice.reducer;
