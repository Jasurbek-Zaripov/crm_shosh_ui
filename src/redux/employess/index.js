import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const StaffGet = createAsyncThunk("Staff/get", async () => {
  return await axios.get(`${API_URL}/staff`).then((res) => res.data);
});

export const StaffPost = createAsyncThunk("Staff/post", async (body) => {
  return await axios
    .post(`${API_URL}/staff`, body)
    .then((res) => res.data?.data);
});
export const StaffPut = createAsyncThunk("Staff/put", async ({ staffBody, id }) => {
  return await axios.put(`${API_URL}/staff/${id}`, staffBody).then((res) => res);
});
export const StaffDelete = createAsyncThunk("Staff/put", async (id) => {
  return await axios.delete(`${API_URL}/staff/${id}`).then((res) => res);
});
export const UploadImage = createAsyncThunk("Images/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "iq8jsr28");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/drxqomgmy/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});
export const UploadImagePassport = createAsyncThunk("ImagesPassport/upload", async (e) => {
  const formData = new FormData();
  formData.append("file", e.target.files[0]);
  formData.append("upload_preset", "iq8jsr28");
  try {
    return await axios
      .post("https://api.cloudinary.com/v1_1/drxqomgmy/upload", formData)
      .then((response) => response?.data.secure_url);
  } catch (error) {
    return error;
  }
});
const StaffSlice = createSlice({
  name: "Staff",
  initialState: {
    StaffGet: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    StaffPost: {
      Loading: false,
      Success: false,
      Error: false,
      data: [],
    },
    StaffPut: {
      Loading: false,
      Success: false,
      Error: false,
    },
    StaffDelete: {
      Loading: false,
      Success: false,
      Error: false,
    },
    UploadImages: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
    UploadImagesPassports: {
      Error: false,
      Loading: false,
      Success: false,
      data: "",
    },
  },
  extraReducers: {
    [StaffGet.pending]: (state, action) => {
      state.StaffGet.Loading = true;
    },
    [StaffGet.fulfilled]: (state, action) => {
      state.StaffGet.Loading = false;
      state.StaffGet.Success = true;
      state.StaffGet.Error = false;
      state.StaffGet.data = action.payload;
    },
    [StaffGet.rejected]: (state, action) => {
      state.StaffGet.Loading = false;
      state.StaffGet.Success = false;
      state.StaffGet.Error = true;
      state.StaffGet.data = [];
    },
    [StaffPost.pending]: (state, action) => {
      state.StaffPost.Loading = true;
    },
    [StaffPost.fulfilled]: (state, action) => {
      state.StaffPost.Loading = false;
      state.StaffPost.Success = true;
      state.StaffPost.Error = false;
    },
    [StaffPost.rejected]: (state, action) => {
      state.StaffPost.Loading = false;
      state.StaffPost.Success = false;
      state.StaffPost.Error = true;
    },
    [StaffDelete.pending]: (state, action) => {
      state.StaffDelete.Loading = true;
    },
    [StaffDelete.fulfilled]: (state, action) => {
      state.StaffDelete.Loading = false;
      state.StaffDelete.Success = true;
      state.StaffDelete.Error = false;
    },
    [StaffDelete.rejected]: (state, action) => {
      state.StaffDelete.Loading = false;
      state.StaffDelete.Success = false;
      state.StaffDelete.Error = true;
    },
    [StaffPut.pending]: (state, action) => {
      state.StaffPut.Loading = true;
    },
    [StaffPut.fulfilled]: (state, action) => {
      state.StaffPut.Loading = false;
      state.StaffPut.Success = true;
      state.StaffPut.Error = false;
    },
    [StaffPut.rejected]: (state, action) => {
      state.StaffPut.Loading = false;
      state.StaffPut.Success = false;
      state.StaffPut.Error = true;
    },
    [UploadImage.pending]: (state, action) => {
      state.UploadImages.Loading = true;
    },
    [UploadImage.fulfilled]: (state, action) => {
      state.UploadImages.Error = false;
      state.UploadImages.Success = true;
      state.UploadImages.Loading = false;
      state.UploadImages.data = action.payload;
    },
    [UploadImage.rejected]: (state, action) => {
      state.UploadImages.Error = action.payload;
      state.UploadImages.Success = false;
      state.UploadImages.Loading = false;
    },
    [UploadImagePassport.pending]: (state, action) => {
      state.UploadImagesPassports.Loading = true;
    },
    [UploadImagePassport.fulfilled]: (state, action) => {
      state.UploadImagesPassports.Error = false;
      state.UploadImagesPassports.Success = true;
      state.UploadImagesPassports.Loading = false;
      state.UploadImagesPassports.data = action.payload;
    },
    [UploadImagePassport.rejected]: (state, action) => {
      state.UploadImagesPassports.Error = action.payload;
      state.UploadImagesPassports.Success = false;
      state.UploadImagesPassports.Loading = false;
    },
  },
});

export const {} = StaffSlice.actions;
export default StaffSlice.reducer;
