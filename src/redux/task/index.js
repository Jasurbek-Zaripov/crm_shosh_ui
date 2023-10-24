import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const TaskGet = createAsyncThunk("Task/get", async () => {
  return await axios.get(`${API_URL}/task`).then((res) => res.data);
});

export const TaskPost = createAsyncThunk("Task/post", async (body) => {
  return await axios
    .post(`${API_URL}/task`, body)
    .then((res) => res.data?.data);
});
export const TaskPut = createAsyncThunk("Task/put", async ({ body, id }) => {
  return await axios.put(`${API_URL}/task/${id}`, body).then((res) => res);
});
export const TaskDelete = createAsyncThunk("Task/put", async (id) => {
  return await axios.delete(`${API_URL}/task/${id}`).then((res) => res);
});
const TaskSlice = createSlice({
  name: "Task",
  initialState: {
    TaskGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    TaskPost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    TaskPut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    TaskDelete: {
      Loading: false,
      Success: false,
      Error: false,
    }
  },
  extraReducers: {
    [TaskGet.pending]: (state, action) => {
      state.TaskGet.Loading = true;
    },
    [TaskGet.fulfilled]: (state, action) => {
      state.TaskGet.Loading = false;
      state.TaskGet.Success = true;
      state.TaskGet.Error = false;
      state.TaskGet.data = action.payload;
    },
    [TaskGet.rejected]: (state, action) => {
      state.TaskGet.Loading = false;
      state.TaskGet.Success = false;
      state.TaskGet.Error = true;
      state.TaskGet.data = [];
    },
    [TaskPost.pending]: (state, action) => {
      state.TaskPost.Loading = true;
    },
    [TaskPost.fulfilled]: (state, action) => {
      state.TaskPost.Loading = false;
      state.TaskPost.Success = true;
      state.TaskPost.Error = false;
    },
    [TaskPost.rejected]: (state, action) => {
      state.TaskPost.Loading = false;
      state.TaskPost.Success = false;
      state.TaskPost.Error = true;
    },
    [TaskDelete.pending]: (state, action) => {
      state.TaskDelete.Loading = true;
    },
    [TaskDelete.fulfilled]: (state, action) => {
      state.TaskDelete.Loading = false;
      state.TaskDelete.Success = true;
      state.TaskDelete.Error = false;
    },
    [TaskDelete.rejected]: (state, action) => {
      state.TaskDelete.Loading = false;
      state.TaskDelete.Success = false;
      state.TaskDelete.Error = true;
    },
    [TaskPut.pending]: (state, action) => {
      state.TaskPut.Loading = true;
    },
    [TaskPut.fulfilled]: (state, action) => {
      state.TaskPut.Loading = false;
      state.TaskPut.Success = true;
      state.TaskPut.Error = false;
    },
    [TaskPut.rejected]: (state, action) => {
      state.TaskPut.Loading = false;
      state.TaskPut.Success = false;
      state.TaskPut.Error = true;
    }
  },
});

export const {} = TaskSlice.actions;
export default TaskSlice.reducer;
