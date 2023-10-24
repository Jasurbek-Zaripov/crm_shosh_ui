import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const OldOrdersGet = createAsyncThunk("OldOrders/get" , async() =>{
    return await  axios.get(`${API_URL}/oldorders`)
    .then(res => res.data)
})
export const OldOrdersBusyGet = createAsyncThunk("OldOrdersBusy/get" , async() =>{
    return await  axios.get(`${API_URL}/oldordersbusy`)
    .then(res => res.data)
})
export const OldOrdersPost = createAsyncThunk("OldOrders/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/oldorders` , body)
    .then(res => res.data?.data)
})
export const OldOrdersPut = createAsyncThunk("OldOrders/put" , async({ body, id}) =>{
    return await axios.put(`${API_URL}/oldorders/${id}`, body)
    .then(res => res)
})

export const OldOrdersDelete = createAsyncThunk("OldOrders/delete" , async(id) =>{
    return await axios.delete(`${API_URL}/oldorders/${id}`)
    .then(res => res)
})
const OldOrdersSlice = createSlice({
    name : "OldOrders",
    initialState:{
        OldOrdersGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        OldOrdersBusyGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        OldOrdersPost:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : [],
            data2 : []
        },
        OldOrdersPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        OldOrdersDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [OldOrdersGet.pending]:(state , action) =>{
            state.OldOrdersGet.Loading = true   
        },
        [OldOrdersGet.fulfilled]:(state , action) =>{
            state.OldOrdersGet.Loading = false
            state.OldOrdersGet.Success = true 
            state.OldOrdersGet.Error = false
            state.OldOrdersGet.data = action.payload
        },
        [OldOrdersGet.rejected]:(state , action) =>{
            state.OldOrdersGet.Loading = false
            state.OldOrdersGet.Success = false 
            state.OldOrdersGet.Error = true
            state.OldOrdersGet.data = []
        },
        [OldOrdersBusyGet.pending]:(state , action) =>{
            state.OldOrdersBusyGet.Loading = true   
        },
        [OldOrdersBusyGet.fulfilled]:(state , action) =>{
            state.OldOrdersBusyGet.Loading = false
            state.OldOrdersBusyGet.Success = true 
            state.OldOrdersBusyGet.Error = false
            state.OldOrdersBusyGet.data = action.payload
        },
        [OldOrdersBusyGet.rejected]:(state , action) =>{
            state.OldOrdersBusyGet.Loading = false
            state.OldOrdersBusyGet.Success = false 
            state.OldOrdersBusyGet.Error = true
            state.OldOrdersBusyGet.data = []
        },
        [OldOrdersPost.pending]:(state , action) =>{
            state.OldOrdersPost.Loading = true   
        },
        [OldOrdersPost.fulfilled]:(state , action) =>{
            state.OldOrdersPost.Loading = false
            state.OldOrdersPost.Success = true 
            state.OldOrdersPost.Error = false
            state.OldOrdersPost.data = window.localStorage.setItem("OldOrdersData", JSON.stringify(action.payload.id)) 
            state.OldOrdersPost.data2 = action.payload.id 
        },
        [OldOrdersPost.rejected]:(state , action) =>{
            state.OldOrdersPost.Loading = false
            state.OldOrdersPost.Success = false 
            state.OldOrdersPost.Error = true
        },
        [OldOrdersDelete.pending]:(state , action) =>{
            state.OldOrdersDelete.Loading = true   
        },
        [OldOrdersDelete.fulfilled]:(state , action) =>{
            state.OldOrdersDelete.Loading = false
            state.OldOrdersDelete.Success = true 
            state.OldOrdersDelete.Error = false
        },
        [OldOrdersDelete.rejected]:(state , action) =>{
            state.OldOrdersDelete.Loading = false
            state.OldOrdersDelete.Success = false 
            state.OldOrdersDelete.Error = true
        },
        [OldOrdersPut.pending]:(state , action) =>{
            state.OldOrdersPut.Loading = true   
        },
        [OldOrdersPut.fulfilled]:(state , action) =>{
            state.OldOrdersPut.Loading = false
            state.OldOrdersPut.Success = action.payload 
            state.OldOrdersPut.Error = false
        },
        [OldOrdersPut.rejected]:(state , action) =>{
            state.OldOrdersPut.Loading = false
            state.OldOrdersPut.Success = false 
            state.OldOrdersPut.Error = true
        }
    }
})

export const {} = OldOrdersSlice.actions;
export default OldOrdersSlice.reducer;