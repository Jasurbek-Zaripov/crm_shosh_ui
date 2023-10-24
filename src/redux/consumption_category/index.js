import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ConsumptionCategoryGet = createAsyncThunk(
  "Consumption_category/get",
  async () => {
    return await axios
      .get(`${API_URL}/consumption_category`)
      .then((res) => res.data);
  }
);
export const ConsumptionCategoryPost = createAsyncThunk(
  "Consumption_category/post",
  async (body) => {
    return await axios
      .post(`${API_URL}/consumption_category`, body)
      .then((res) => res.data?.data);
  }
);
export const ConsumptionCategoryPut = createAsyncThunk(
  "Consumption_category/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/consumption_category/${id}`, body)
      .then((res) => res);
  }
);
export const ConsumptionCategoryDelete = createAsyncThunk(
  "Consumption_category/put",
  async (id) => {
    return await axios
      .delete(`${API_URL}/consumption_category/${id}`)
      .then((res) => res);
  }
);
const ConsumptionCategorySlice = createSlice({
  name: "Consumption_category",
  initialState: {
    ConsumptionCategoryGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionCategoryPost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionCategoryPut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    ConsumptionCategoryDelete: {
      Loading: false,
      Success: false,
      Error: false,
    },
  },
  extraReducers: {
    [ConsumptionCategoryGet.pending]: (state, action) => {
      state.ConsumptionCategoryGet.Loading = true;
    },
    [ConsumptionCategoryGet.fulfilled]: (state, action) => {
      state.ConsumptionCategoryGet.Loading = false;
      state.ConsumptionCategoryGet.Success = true;
      state.ConsumptionCategoryGet.Error = false;
      state.ConsumptionCategoryGet.data = action.payload;
    },
    [ConsumptionCategoryGet.rejected]: (state, action) => {
      state.ConsumptionCategoryGet.Loading = false;
      state.ConsumptionCategoryGet.Success = false;
      state.ConsumptionCategoryGet.Error = true;
      state.ConsumptionCategoryGet.data = [];
    },
    [ConsumptionCategoryPost.pending]: (state, action) => {
      state.ConsumptionCategoryPost.Loading = true;
    },
    [ConsumptionCategoryPost.fulfilled]: (state, action) => {
      state.ConsumptionCategoryPost.Loading = false;
      state.ConsumptionCategoryPost.Success = true;
      state.ConsumptionCategoryPost.Error = false;
      state.ConsumptionCategoryPost.data = action.payload;
    },
    [ConsumptionCategoryPost.rejected]: (state, action) => {
      state.ConsumptionCategoryPost.Loading = false;
      state.ConsumptionCategoryPost.Success = false;
      state.ConsumptionCategoryPost.Error = true;
    },
    [ConsumptionCategoryDelete.pending]: (state, action) => {
      state.ConsumptionCategoryDelete.Loading = true;
    },
    [ConsumptionCategoryDelete.fulfilled]: (state, action) => {
      state.ConsumptionCategoryDelete.Loading = false;
      state.ConsumptionCategoryDelete.Success = true;
      state.ConsumptionCategoryDelete.Error = false;
    },
    [ConsumptionCategoryDelete.rejected]: (state, action) => {
      state.ConsumptionCategoryDelete.Loading = false;
      state.ConsumptionCategoryDelete.Success = false;
      state.ConsumptionCategoryDelete.Error = true;
    },
    [ConsumptionCategoryPut.pending]: (state, action) => {
      state.ConsumptionCategoryPut.Loading = true;
    },
    [ConsumptionCategoryPut.fulfilled]: (state, action) => {
      state.ConsumptionCategoryPut.Loading = false;
      state.ConsumptionCategoryPut.Success = true;
      state.ConsumptionCategoryPut.Error = false;
    },
    [ConsumptionCategoryPut.rejected]: (state, action) => {
      state.ConsumptionCategoryPut.Loading = false;
      state.ConsumptionCategoryPut.Success = false;
      state.ConsumptionCategoryPut.Error = true;
    },
  },
});

export const {} = ConsumptionCategorySlice.actions;
export default ConsumptionCategorySlice.reducer;
