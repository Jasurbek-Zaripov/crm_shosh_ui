import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const LidsGet = createAsyncThunk("Lids/get" , async() =>{
    return await  axios.get(`${API_URL}/lids`)
    .then(res => res.data)
})
export const LidsNewGet = createAsyncThunk("NewLids/get" , async() =>{
    return await  axios.get(`${API_URL}/newlids`)
    .then(res => res.data)
})
export const LidsActiveGet = createAsyncThunk("ActiveLids/get" , async() =>{
    return await  axios.get(`${API_URL}/lidsactive`)
    .then(res => res.data)
})
export const LidsPost = createAsyncThunk("Lids/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/lids` , body)
    .then(res => res.data?.data)
})
export const LidsPut = createAsyncThunk("Lids/put" , async({body , id}) =>{
    return await axios.put(`${API_URL}/lids/${id}` , body)
    .then(res => res)
})
export const LidsDelete = createAsyncThunk("Lids/put" , async(id) =>{
    return await axios.delete(`${API_URL}/lids/${id}`)
    .then(res => res)
})
const LidsSlice = createSlice({
    name : "Lids",
    initialState:{
        LidsGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        LidsNewGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        LidsActiveGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        LidsPost:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        LidsPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        LidsDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [LidsGet.pending]:(state , action) =>{
            state.LidsGet.Loading = true   
        },
        [LidsGet.fulfilled]:(state , action) =>{
            state.LidsGet.Loading = false
            state.LidsGet.Success = true 
            state.LidsGet.Error = false
            state.LidsGet.data = action.payload
        },
        [LidsGet.rejected]:(state , action) =>{
            state.LidsGet.Loading = false
            state.LidsGet.Success = false 
            state.LidsGet.Error = true
            state.LidsGet.data = []
        },
        [LidsNewGet.pending]:(state , action) =>{
            state.LidsNewGet.Loading = true   
        },
        [LidsNewGet.fulfilled]:(state , action) =>{
            state.LidsNewGet.Loading = false
            state.LidsNewGet.Success = true 
            state.LidsNewGet.Error = false
            state.LidsNewGet.data = action.payload
        },
        [LidsNewGet.rejected]:(state , action) =>{
            state.LidsNewGet.Loading = false
            state.LidsNewGet.Success = false 
            state.LidsNewGet.Error = true
            state.LidsNewGet.data = []
        },
        [LidsActiveGet.pending]:(state , action) =>{
            state.LidsActiveGet.Loading = true   
        },
        [LidsActiveGet.fulfilled]:(state , action) =>{
            state.LidsActiveGet.Loading = false
            state.LidsActiveGet.Success = true 
            state.LidsActiveGet.Error = false
            state.LidsActiveGet.data = action.payload
        },
        [LidsActiveGet.rejected]:(state , action) =>{
            state.LidsActiveGet.Loading = false
            state.LidsActiveGet.Success = false 
            state.LidsActiveGet.Error = true
            state.LidsActiveGet.data = []
        },
        [LidsPost.pending]:(state , action) =>{
            state.LidsPost.Loading = true   
        },
        [LidsPost.fulfilled]:(state , action) =>{
            state.LidsPost.Loading = false
            state.LidsPost.Success = true 
            state.LidsPost.Error = false
            state.LidsPost.data = window.localStorage.setItem("LidsData", JSON.stringify(action.payload.id)) 
        },
        [LidsPost.rejected]:(state , action) =>{
            state.LidsPost.Loading = false
            state.LidsPost.Success = false 
            state.LidsPost.Error = true
        },
        [LidsDelete.pending]:(state , action) =>{
            state.LidsDelete.Loading = true   
        },
        [LidsDelete.fulfilled]:(state , action) =>{
            state.LidsDelete.Loading = false
            state.LidsDelete.Success = true 
            state.LidsDelete.Error = false
        },
        [LidsDelete.rejected]:(state , action) =>{
            state.LidsDelete.Loading = false
            state.LidsDelete.Success = false 
            state.LidsDelete.Error = true
        },
        [LidsPut.pending]:(state , action) =>{
            state.LidsPut.Loading = true   
        },
        [LidsPut.fulfilled]:(state , action) =>{
            state.LidsPut.Loading = false
            state.LidsPut.Success = true 
            state.LidsPut.Error = false
        },
        [LidsPut.rejected]:(state , action) =>{
            state.LidsPut.Loading = false
            state.LidsPut.Success = false 
            state.LidsPut.Error = true
        }
    }
})

export const {} = LidsSlice.actions;
export default LidsSlice.reducer;