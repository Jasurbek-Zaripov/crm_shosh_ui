import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const UsersGet = createAsyncThunk("Users/get" , async() =>{
    return await  axios.get(`${API_URL}/users`)
    .then(res => res.data)
})
export const UsersPost = createAsyncThunk("Users/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/users` , body)
    .then(res => res.data?.data)
})
export const UsersPut = createAsyncThunk("Users/put" , async({body , id}) =>{
    return await axios.put(`${API_URL}/users/${id}` , body)
    .then(res => res)
})
export const UsersDelete = createAsyncThunk("Users/put" , async(id) =>{
    return await axios.delete(`${API_URL}/users/${id}`)
    .then(res => res)
})
const UsersSlice = createSlice({
    name : "Users",
    initialState:{
        UsersGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        UsersPost:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        UsersPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        UsersDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [UsersGet.pending]:(state , action) =>{
            state.UsersGet.Loading = true   
        },
        [UsersGet.fulfilled]:(state , action) =>{
            state.UsersGet.Loading = false
            state.UsersGet.Success = true 
            state.UsersGet.Error = false
            state.UsersGet.data = action.payload
        },
        [UsersGet.rejected]:(state , action) =>{
            state.UsersGet.Loading = false
            state.UsersGet.Success = false 
            state.UsersGet.Error = true
            state.UsersGet.data = []
        },
        [UsersPost.pending]:(state , action) =>{
            state.UsersPost.Loading = true   
        },
        [UsersPost.fulfilled]:(state , action) =>{
            state.UsersPost.Loading = false
            state.UsersPost.Success = true 
            state.UsersPost.Error = false
            state.UsersPost.data = action.payload
        },
        [UsersPost.rejected]:(state , action) =>{
            state.UsersPost.Loading = false
            state.UsersPost.Success = false 
            state.UsersPost.Error = true
        },
        [UsersDelete.pending]:(state , action) =>{
            state.UsersDelete.Loading = true   
        },
        [UsersDelete.fulfilled]:(state , action) =>{
            state.UsersDelete.Loading = false
            state.UsersDelete.Success = true 
            state.UsersDelete.Error = false
        },
        [UsersDelete.rejected]:(state , action) =>{
            state.UsersDelete.Loading = false
            state.UsersDelete.Success = false 
            state.UsersDelete.Error = true
        },
        [UsersPut.pending]:(state , action) =>{
            state.UsersPut.Loading = true   
        },
        [UsersPut.fulfilled]:(state , action) =>{
            state.UsersPut.Loading = false
            state.UsersPut.Success = true 
            state.UsersPut.Error = false
        },
        [UsersPut.rejected]:(state , action) =>{
            state.UsersPut.Loading = false
            state.UsersPut.Success = false 
            state.UsersPut.Error = true
        }
    }
})

export const {} = UsersSlice.actions;
export default UsersSlice.reducer;