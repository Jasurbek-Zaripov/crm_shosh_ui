import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ConsumptionGet = createAsyncThunk(
  "Consumption/get",
  async () => {
    return await axios
      .get(`${API_URL}/consumption`)
      .then((res) => res.data);
  }
);
export const ConsumptionAdminGet = createAsyncThunk(
  "ConsumptionAdmin/get",
  async () => {
    return await axios
      .get(`${API_URL}/consumptionadmin`)
      .then((res) => res.data);
  }
);
export const ConsumptionManagerGet = createAsyncThunk(
  "ConsumptionManager/get",
  async () => {
    return await axios
      .get(`${API_URL}/consumptionmanager`)
      .then((res) => res.data);
  }
);
export const ConsumptionPost = createAsyncThunk(
  "Consumption/post",
  async (body) => {
    return await axios
      .post(`${API_URL}/consumption`, body)
      .then((res) => res.data?.data);
  }
);
export const ConsumptionPut = createAsyncThunk(
  "Consumption/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/consumption/${id}`, body)
      .then((res) => res);
  }
);
export const ConsumptionDelete = createAsyncThunk(
  "Consumption/put",
  async (id) => {
    return await axios
      .delete(`${API_URL}/consumption/${id}`)
      .then((res) => res);
  }
);
const ConsumptionSlice = createSlice({
  name: "Consumption",
  initialState: {
    ConsumptionGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionAdminGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionManagerGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionPost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ConsumptionPut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    ConsumptionDelete: {
      Loading: false,
      Success: false,
      Error: false,
    },
  },
  extraReducers: {
    [ConsumptionGet.pending]: (state, action) => {
      state.ConsumptionGet.Loading = true;
    },
    [ConsumptionGet.fulfilled]: (state, action) => {
      state.ConsumptionGet.Loading = false;
      state.ConsumptionGet.Success = true;
      state.ConsumptionGet.Error = false;
      state.ConsumptionGet.data = action.payload;
    },
    [ConsumptionGet.rejected]: (state, action) => {
      state.ConsumptionGet.Loading = false;
      state.ConsumptionGet.Success = false;
      state.ConsumptionGet.Error = true;
      state.ConsumptionGet.data = [];
    },
    [ConsumptionAdminGet.pending]: (state, action) => {
      state.ConsumptionAdminGet.Loading = true;
    },
    [ConsumptionAdminGet.fulfilled]: (state, action) => {
      state.ConsumptionAdminGet.Loading = false;
      state.ConsumptionAdminGet.Success = true;
      state.ConsumptionAdminGet.Error = false;
      state.ConsumptionAdminGet.data = action.payload;
    },
    [ConsumptionAdminGet.rejected]: (state, action) => {
      state.ConsumptionAdminGet.Loading = false;
      state.ConsumptionAdminGet.Success = false;
      state.ConsumptionAdminGet.Error = true;
      state.ConsumptionAdminGet.data = [];
    },
    [ConsumptionManagerGet.pending]: (state, action) => {
      state.ConsumptionManagerGet.Loading = true;
    },
    [ConsumptionManagerGet.fulfilled]: (state, action) => {
      state.ConsumptionManagerGet.Loading = false;
      state.ConsumptionManagerGet.Success = true;
      state.ConsumptionManagerGet.Error = false;
      state.ConsumptionManagerGet.data = action.payload;
    },
    [ConsumptionManagerGet.rejected]: (state, action) => {
      state.ConsumptionManagerGet.Loading = false;
      state.ConsumptionManagerGet.Success = false;
      state.ConsumptionManagerGet.Error = true;
      state.ConsumptionManagerGet.data = [];
    },
    [ConsumptionPost.pending]: (state, action) => {
      state.ConsumptionPost.Loading = true;
    },
    [ConsumptionPost.fulfilled]: (state, action) => {
      state.ConsumptionPost.Loading = false;
      state.ConsumptionPost.Success = true;
      state.ConsumptionPost.Error = false;
      state.ConsumptionPost.data = action.payload;
    },
    [ConsumptionPost.rejected]: (state, action) => {
      state.ConsumptionPost.Loading = false;
      state.ConsumptionPost.Success = false;
      state.ConsumptionPost.Error = true;
    },
    [ConsumptionDelete.pending]: (state, action) => {
      state.ConsumptionDelete.Loading = true;
    },
    [ConsumptionDelete.fulfilled]: (state, action) => {
      state.ConsumptionDelete.Loading = false;
      state.ConsumptionDelete.Success = true;
      state.ConsumptionDelete.Error = false;
    },
    [ConsumptionDelete.rejected]: (state, action) => {
      state.ConsumptionDelete.Loading = false;
      state.ConsumptionDelete.Success = false;
      state.ConsumptionDelete.Error = true;
    },
    [ConsumptionPut.pending]: (state, action) => {
      state.ConsumptionPut.Loading = true;
    },
    [ConsumptionPut.fulfilled]: (state, action) => {
      state.ConsumptionPut.Loading = false;
      state.ConsumptionPut.Success = true;
      state.ConsumptionPut.Error = false;
    },
    [ConsumptionPut.rejected]: (state, action) => {
      state.ConsumptionPut.Loading = false;
      state.ConsumptionPut.Success = false;
      state.ConsumptionPut.Error = true;
    },
  },
});

export const {} = ConsumptionSlice.actions;
export default ConsumptionSlice.reducer;
