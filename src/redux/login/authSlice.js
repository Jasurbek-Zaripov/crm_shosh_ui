import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Cookies from "universal-cookie";
import {API_URL} from "./../../utils/api"
    const cookies = new Cookies();
let initialState = {
    Error : "",
    Success : false,
    Loading : false,
    Token : "",
    UserData : [],
    UserDataVerfiy : []
}
export let Auth = createAsyncThunk('role' , async(body , {rejectWithValue}) => {
    try {
        const res = await axios.post(`${API_URL}/login` , body)
        return {
            verifyCodeSuccess : res.data?.token,
            verifyUserData : res.data?.data
        }
    } catch (error) {
        return  rejectWithValue(error)
    }
})
let authSlice = createSlice({
    name : "role",
    initialState,
    reducers:{
        addToken:(state , action) =>{
            state.verifyCodeSuccess = window.localStorage.getItem("AuthTokenUser")
        },
    },
    extraReducers:{
        [Auth.pending]:(state , action) =>{
            state.Loading = true
        },
        [Auth.fulfilled]:(state , action) =>{
            state.Success = true
            state.Loading = false
            state.Error = false
            state.Token = window.localStorage.setItem("AuthTokenUser", action.payload.verifyCodeSuccess) 
            state.UserData = window.localStorage.setItem("AuthDataUser", JSON.stringify(action.payload.verifyUserData)) 
            state.UserDataVerfiy = action.payload.verifyUserData
        },       
         [Auth.rejected]:(state , action) =>{
            state.Success = false
            state.Loading = false
            state.Error = action.payload
            state.Token = ''
            state.UserData = ''
        }
    }
})

export const {addToken} = authSlice.actions;
export default authSlice.reducer;