import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api";

export const RoomsGet = createAsyncThunk("Rooms/get" , async() =>{
    return await  axios.get(`${API_URL}/rooms`)
    .then(res => res.data)
})
export const RoomsEmpytGet = createAsyncThunk("RoomsEmpty/get" , async() =>{
    return await  axios.get(`${API_URL}/emptyrooms`)
    .then(res => res.data)
})
export const RoomsPost = createAsyncThunk("Rooms/post" ,  async(body) =>{
    return await axios.post(`${API_URL}/rooms` , body)
    .then(res => res)
})
export const RoomsPut = createAsyncThunk("Rooms/put" , async({body , id}) =>{
    return await axios.put(`${API_URL}/rooms/${id}` , body)
    .then(res => res)
})
export const RoomsDelete = createAsyncThunk("Rooms/delete" , async(id) =>{
    return await axios.delete(`${API_URL}/rooms/${id}`)
    .then(res => res)
})
const RoomsSlice = createSlice({
    name : "Rooms",
    initialState:{
        RoomsGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        RoomsEmpytGet:{
            Loading  : false,
            Success : false, 
            Error : false,
            data : []
        },
        RoomsPost:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        RoomsPut:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
        RoomsDelete:{
            Loading  : false,
            Success : false, 
            Error : false,
        },
    },
    extraReducers:{
        [RoomsGet.pending]:(state , action) =>{
            state.RoomsGet.Loading = true   
        },
        [RoomsGet.fulfilled]:(state , action) =>{
            state.RoomsGet.Loading = false
            state.RoomsGet.Success = true 
            state.RoomsGet.Error = false
            state.RoomsGet.data = action.payload
        },
        [RoomsGet.rejected]:(state , action) =>{
            state.RoomsGet.Loading = false
            state.RoomsGet.Success = false 
            state.RoomsGet.Error = true
            state.RoomsGet.data = []
        },
        [RoomsEmpytGet.pending]:(state , action) =>{
            state.RoomsEmpytGet.Loading = true   
        },
        [RoomsEmpytGet.fulfilled]:(state , action) =>{
            state.RoomsEmpytGet.Loading = false
            state.RoomsEmpytGet.Success = true 
            state.RoomsEmpytGet.Error = false
            state.RoomsEmpytGet.data = action.payload
        },
        [RoomsEmpytGet.rejected]:(state , action) =>{
            state.RoomsEmpytGet.Loading = false
            state.RoomsEmpytGet.Success = false 
            state.RoomsEmpytGet.Error = true
            state.RoomsEmpytGet.data = []
        },
        [RoomsPost.pending]:(state , action) =>{
            state.RoomsPost.Loading = true   
        },
        [RoomsPost.fulfilled]:(state , action) =>{
            state.RoomsPost.Loading = false
            state.RoomsPost.Success = true 
            state.RoomsPost.Error = false
        },
        [RoomsPost.rejected]:(state , action) =>{
            state.RoomsPost.Loading = false
            state.RoomsPost.Success = false 
            state.RoomsPost.Error = true
        },
        [RoomsDelete.pending]:(state , action) =>{
            state.RoomsDelete.Loading = true   
        },
        [RoomsDelete.fulfilled]:(state , action) =>{
            state.RoomsDelete.Loading = false
            state.RoomsDelete.Success = true 
            state.RoomsDelete.Error = false
        },
        [RoomsDelete.rejected]:(state , action) =>{
            state.RoomsDelete.Loading = false
            state.RoomsDelete.Success = false 
            state.RoomsDelete.Error = true
        },
        [RoomsPut.pending]:(state , action) =>{
            state.RoomsPut.Loading = true   
        },
        [RoomsPut.fulfilled]:(state , action) =>{
            state.RoomsPut.Loading = false
            state.RoomsPut.Success = true 
            state.RoomsPut.Error = false
        },
        [RoomsPut.rejected]:(state , action) =>{
            state.RoomsPut.Loading = false
            state.RoomsPut.Success = false 
            state.RoomsPut.Error = true
        }
    }
})

export const {} = RoomsSlice.actions;
export default RoomsSlice.reducer;