import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const OrdersGet = createAsyncThunk("Orders/get" , async() =>{
    return await  axios.get(`${API_URL}/orders`)
    .then(res => res.data)
})
export const OrdersBusyGet = createAsyncThunk("OrdersBusy/get" , async() =>{
    return await  axios.get(`${API_URL}/ordersbusy`)
    .then(res => res.data)
})
export const OrdersPost = createAsyncThunk("Orders/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/orders` , body)
    .then(res => res.data?.data)
})
export const OrdersPut = createAsyncThunk("Orders/put" , async({ body, id}) =>{
    return await axios.put(`${API_URL}/orders/${id}`, body)
    .then(res => res)
})

export const OrdersDelete = createAsyncThunk("Orders/delete" , async(id) =>{
    return await axios.delete(`${API_URL}/orders/${id}`)
    .then(res => res)
})
const OrdersSlice = createSlice({
    name : "Orders",
    initialState:{
        OrdersGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        OrdersBusyGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        OrdersPost:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : [],
            data2 : []
        },
        OrdersPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        OrdersDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [OrdersGet.pending]:(state , action) =>{
            state.OrdersGet.Loading = true   
        },
        [OrdersGet.fulfilled]:(state , action) =>{
            state.OrdersGet.Loading = false
            state.OrdersGet.Success = true 
            state.OrdersGet.Error = false
            state.OrdersGet.data = action.payload
        },
        [OrdersGet.rejected]:(state , action) =>{
            state.OrdersGet.Loading = false
            state.OrdersGet.Success = false 
            state.OrdersGet.Error = true
            state.OrdersGet.data = []
        },
        [OrdersBusyGet.pending]:(state , action) =>{
            state.OrdersBusyGet.Loading = true   
        },
        [OrdersBusyGet.fulfilled]:(state , action) =>{
            state.OrdersBusyGet.Loading = false
            state.OrdersBusyGet.Success = true 
            state.OrdersBusyGet.Error = false
            state.OrdersBusyGet.data = action.payload
        },
        [OrdersBusyGet.rejected]:(state , action) =>{
            state.OrdersBusyGet.Loading = false
            state.OrdersBusyGet.Success = false 
            state.OrdersBusyGet.Error = true
            state.OrdersBusyGet.data = []
        },
        [OrdersPost.pending]:(state , action) =>{
            state.OrdersPost.Loading = true   
        },
        [OrdersPost.fulfilled]:(state , action) =>{
            state.OrdersPost.Loading = false
            state.OrdersPost.Success = true 
            state.OrdersPost.Error = false
            state.OrdersPost.data = window.localStorage.setItem("OrdersData", JSON.stringify(action.payload.id)) 
            state.OrdersPost.data2 = action.payload.id 
        },
        [OrdersPost.rejected]:(state , action) =>{
            state.OrdersPost.Loading = false
            state.OrdersPost.Success = false 
            state.OrdersPost.Error = true
        },
        [OrdersDelete.pending]:(state , action) =>{
            state.OrdersDelete.Loading = true   
        },
        [OrdersDelete.fulfilled]:(state , action) =>{
            state.OrdersDelete.Loading = false
            state.OrdersDelete.Success = true 
            state.OrdersDelete.Error = false
        },
        [OrdersDelete.rejected]:(state , action) =>{
            state.OrdersDelete.Loading = false
            state.OrdersDelete.Success = false 
            state.OrdersDelete.Error = true
        },
        [OrdersPut.pending]:(state , action) =>{
            state.OrdersPut.Loading = true   
        },
        [OrdersPut.fulfilled]:(state , action) =>{
            state.OrdersPut.Loading = false
            state.OrdersPut.Success = action.payload 
            state.OrdersPut.Error = false
        },
        [OrdersPut.rejected]:(state , action) =>{
            state.OrdersPut.Loading = false
            state.OrdersPut.Success = false 
            state.OrdersPut.Error = true
        }
    }
})

export const {} = OrdersSlice.actions;
export default OrdersSlice.reducer;