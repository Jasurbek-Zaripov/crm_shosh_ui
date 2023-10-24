import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ChangeGet = createAsyncThunk("Change/get", async () => {
  return await axios.get(`${API_URL}/change`).then((res) => res.data);
});
export const ChangeAdminGet = createAsyncThunk("ChangeAdmin/get", async () => {
  return await axios.get(`${API_URL}/changeadmin`).then((res) => res.data);
});
export const ChangeManagerGet = createAsyncThunk("ChangeManager/get", async () => {
  return await axios.get(`${API_URL}/changemanager`).then((res) => res.data);
});
export const ChangePost = createAsyncThunk("Change/post", async (body) => {
  return await axios
    .post(`${API_URL}/change`, body)
    .then((res) => res.data?.data);
});
export const ChangePut = createAsyncThunk(
  "Change/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/change/${id}`, body)
      .then((res) => res);
  }
);
export const ChangeDelete = createAsyncThunk("Change/delete", async (body) => {
  return await axios.delete(`${API_URL}/changedelete` , body).then((res) => res);
});
const ChangeSlice = createSlice({
  name: "Change",
  initialState: {
    ChangeGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ChangeAdminGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ChangeManagerGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ChangePost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ChangePut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    ChangeDelete: {
      Loading: false,
      Success: false,
      Error: false,
    },
  },
  extraReducers: {
    [ChangeGet.pending]: (state, action) => {
      state.ChangeGet.Loading = true;
    },
    [ChangeGet.fulfilled]: (state, action) => {
      state.ChangeGet.Loading = false;
      state.ChangeGet.Success = true;
      state.ChangeGet.Error = false;
      state.ChangeGet.data = action.payload;
    },
    [ChangeGet.rejected]: (state, action) => {
      state.ChangeGet.Loading = false;
      state.ChangeGet.Success = false;
      state.ChangeGet.Error = true;
      state.ChangeGet.data = [];
    },
    [ChangeAdminGet.pending]: (state, action) => {
      state.ChangeAdminGet.Loading = true;
    },
    [ChangeAdminGet.fulfilled]: (state, action) => {
      state.ChangeAdminGet.Loading = false;
      state.ChangeAdminGet.Success = true;
      state.ChangeAdminGet.Error = false;
      state.ChangeAdminGet.data = action.payload;
    },
    [ChangeAdminGet.rejected]: (state, action) => {
      state.ChangeAdminGet.Loading = false;
      state.ChangeAdminGet.Success = false;
      state.ChangeAdminGet.Error = true;
      state.ChangeAdminGet.data = [];
    },
    [ChangeManagerGet.pending]: (state, action) => {
      state.ChangeManagerGet.Loading = true;
    },
    [ChangeManagerGet.fulfilled]: (state, action) => {
      state.ChangeManagerGet.Loading = false;
      state.ChangeManagerGet.Success = true;
      state.ChangeManagerGet.Error = false;
      state.ChangeManagerGet.data = action.payload;
    },
    [ChangeManagerGet.rejected]: (state, action) => {
      state.ChangeManagerGet.Loading = false;
      state.ChangeManagerGet.Success = false;
      state.ChangeManagerGet.Error = true;
      state.ChangeManagerGet.data = [];
    },
    [ChangePost.pending]: (state, action) => {
      state.ChangePost.Loading = true;
    },
    [ChangePost.fulfilled]: (state, action) => {
      state.ChangePost.Loading = false;
      state.ChangePost.Success = true;
      state.ChangePost.Error = false;
    },
    [ChangePost.rejected]: (state, action) => {
      state.ChangePost.Loading = false;
      state.ChangePost.Success = false;
      state.ChangePost.Error = true;
    },
    [ChangeDelete.pending]: (state, action) => {
      state.ChangeDelete.Loading = true;
    },
    [ChangeDelete.fulfilled]: (state, action) => {
      state.ChangeDelete.Loading = false;
      state.ChangeDelete.Success = true;
      state.ChangeDelete.Error = false;
    },
    [ChangeDelete.rejected]: (state, action) => {
      state.ChangeDelete.Loading = false;
      state.ChangeDelete.Success = false;
      state.ChangeDelete.Error = true;
    },
    [ChangePut.pending]: (state, action) => {
      state.ChangePut.Loading = true;
    },
    [ChangePut.fulfilled]: (state, action) => {
      state.ChangePut.Loading = false;
      state.ChangePut.Success = true;
      state.ChangePut.Error = false;
    },
    [ChangePut.rejected]: (state, action) => {
      state.ChangePut.Loading = false;
      state.ChangePut.Success = false;
      state.ChangePut.Error = true;
    },
  },
});

export const {} = ChangeSlice.actions;
export default ChangeSlice.reducer;
