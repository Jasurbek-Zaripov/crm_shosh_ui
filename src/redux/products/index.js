import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ProductsGet = createAsyncThunk("Products/get", async () => {
  return await axios.get(`${API_URL}/products`).then((res) => res.data);
});

export const ProductsPost = createAsyncThunk("Products/post", async (body) => {
  return await axios
    .post(`${API_URL}/products`, body)
    .then((res) => res.data?.data);
});
export const ProductsPut = createAsyncThunk(
  "Products/put",
  async ({ body, id }) => {
    return await axios
      .put(`${API_URL}/products/${id}`, body)
      .then((res) => res);
  }
);
export const ProductsDelete = createAsyncThunk("Products/put", async (id) => {
  return await axios.delete(`${API_URL}/products/${id}`).then((res) => res);
});
const ProductsSlice = createSlice({
  name: "Products",
  initialState: {
    ProductsGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ProductsPost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    ProductsPut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    ProductsDelete: {
      Loading: false,
      Success: false,
      Error: false,
    },
  },
  extraReducers: {
    [ProductsGet.pending]: (state, action) => {
      state.ProductsGet.Loading = true;
    },
    [ProductsGet.fulfilled]: (state, action) => {
      state.ProductsGet.Loading = false;
      state.ProductsGet.Success = true;
      state.ProductsGet.Error = false;
      state.ProductsGet.data = action.payload;
    },
    [ProductsGet.rejected]: (state, action) => {
      state.ProductsGet.Loading = false;
      state.ProductsGet.Success = false;
      state.ProductsGet.Error = true;
      state.ProductsGet.data = [];
    },
    [ProductsPost.pending]: (state, action) => {
      state.ProductsPost.Loading = true;
    },
    [ProductsPost.fulfilled]: (state, action) => {
      state.ProductsPost.Loading = false;
      state.ProductsPost.Success = true;
      state.ProductsPost.Error = false;
    },
    [ProductsPost.rejected]: (state, action) => {
      state.ProductsPost.Loading = false;
      state.ProductsPost.Success = false;
      state.ProductsPost.Error = true;
    },
    [ProductsDelete.pending]: (state, action) => {
      state.ProductsDelete.Loading = true;
    },
    [ProductsDelete.fulfilled]: (state, action) => {
      state.ProductsDelete.Loading = false;
      state.ProductsDelete.Success = true;
      state.ProductsDelete.Error = false;
    },
    [ProductsDelete.rejected]: (state, action) => {
      state.ProductsDelete.Loading = false;
      state.ProductsDelete.Success = false;
      state.ProductsDelete.Error = true;
    },
    [ProductsPut.pending]: (state, action) => {
      state.ProductsPut.Loading = true;
    },
    [ProductsPut.fulfilled]: (state, action) => {
      state.ProductsPut.Loading = false;
      state.ProductsPut.Success = true;
      state.ProductsPut.Error = false;
    },
    [ProductsPut.rejected]: (state, action) => {
      state.ProductsPut.Loading = false;
      state.ProductsPut.Success = false;
      state.ProductsPut.Error = true;
    },
  },
});

export const {} = ProductsSlice.actions;
export default ProductsSlice.reducer;
