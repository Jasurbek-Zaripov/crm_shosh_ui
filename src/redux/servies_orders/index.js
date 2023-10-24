import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const ServicesOrdersGet = createAsyncThunk("Services_orders/get" , async() =>{
    return await  axios.get(`${API_URL}/services_orders`)
    .then(res => res.data)
})
// export const OrdersBusyGet = createAsyncThunk("OrdersBusy/get" , async() =>{
//     return await  axios.get(`${API_URL}/ordersbusy`)
//     .then(res => res.data)
// })
export const ServicesOrdersPost = createAsyncThunk("Services_orders/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/services_orders` , body)
    .then(res => res.data?.data)
})
export const ServicesOrdersPut = createAsyncThunk("Services_orders/put" , async({body , id}) =>{
    return await axios.put(`${API_URL}/services_orders/${id}` , body)
    .then(res => res)
})
export const ServicesOrdersDelete = createAsyncThunk("Services_orders/delete" , async(id) =>{
    return await axios.delete(`${API_URL}/services_orders/${id}`)
    .then(res => res)
})
const ServicesOrdersSlice = createSlice({
    name : "Services_orders",
    initialState:{
        ServicesOrdersGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        // OrdersBusyGet:{
        //     Loading  : false,
        //     Success : false, 
        //     Error : false,
        //     data : []
        // },
        ServicesOrdersPost:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        ServicesOrdersPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        ServicesOrdersDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [ServicesOrdersGet.pending]:(state , action) =>{
            state.ServicesOrdersGet.Loading = true   
        },
        [ServicesOrdersGet.fulfilled]:(state , action) =>{
            state.ServicesOrdersGet.Loading = false
            state.ServicesOrdersGet.Success = true 
            state.ServicesOrdersGet.Error = false
            state.ServicesOrdersGet.data = action.payload
        },
        [ServicesOrdersGet.rejected]:(state , action) =>{
            state.ServicesOrdersGet.Loading = false
            state.ServicesOrdersGet.Success = false 
            state.ServicesOrdersGet.Error = true
            state.ServicesOrdersGet.data = []
        },
        [ServicesOrdersPost.pending]:(state , action) =>{
            state.ServicesOrdersPost.Loading = true   
        },
        [ServicesOrdersPost.fulfilled]:(state , action) =>{
            state.ServicesOrdersPost.Loading = false
            state.ServicesOrdersPost.Success = true 
            state.ServicesOrdersPost.Error = false
            // state.ServicesOrdersPost.data = window.localStorage.setItem("OrdersData", JSON.stringify(action.payload.id)) 
        },
        [ServicesOrdersPost.rejected]:(state , action) =>{
            state.ServicesOrdersPost.Loading = false
            state.ServicesOrdersPost.Success = false 
            state.ServicesOrdersPost.Error = true
        },
        [ServicesOrdersDelete.pending]:(state , action) =>{
            state.ServicesOrdersDelete.Loading = true   
        },
        [ServicesOrdersDelete.fulfilled]:(state , action) =>{
            state.ServicesOrdersDelete.Loading = false
            state.ServicesOrdersDelete.Success = true 
            state.ServicesOrdersDelete.Error = false
        },
        [ServicesOrdersDelete.rejected]:(state , action) =>{
            state.ServicesOrdersDelete.Loading = false
            state.ServicesOrdersDelete.Success = false 
            state.ServicesOrdersDelete.Error = true
        },
        [ServicesOrdersPut.pending]:(state , action) =>{
            state.ServicesOrdersPut.Loading = true   
        },
        [ServicesOrdersPut.fulfilled]:(state , action) =>{
            state.ServicesOrdersPut.Loading = false
            state.ServicesOrdersPut.Success = true 
            state.ServicesOrdersPut.Error = false
        },
        [ServicesOrdersPut.rejected]:(state , action) =>{
            state.ServicesOrdersPut.Loading = false
            state.ServicesOrdersPut.Success = false 
            state.ServicesOrdersPut.Error = true
        }
    }
})

export const {} = ServicesOrdersSlice.actions;
export default ServicesOrdersSlice.reducer;