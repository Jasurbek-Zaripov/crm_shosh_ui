import {createSlice} from "@reduxjs/toolkit";

const InstantBookingModal = createSlice({
    name: 'InstantBookingModal',
    initialState: {
        open: false
    },
    reducers: {
        openModal(state, action) {
            state.open = true
        },
        closeModal(state, action) {
            state.open = false
        }
    }
})

export const {closeModal, openModal} = InstantBookingModal.actions
export default InstantBookingModal.reducer