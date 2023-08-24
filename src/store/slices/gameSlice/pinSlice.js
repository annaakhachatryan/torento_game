import { createSlice } from "@reduxjs/toolkit";

const pinSlice = createSlice({
    name: 'pin',
    initialState: {
        status:false,
        textt:[]
    },
    reducers: {
        addText(state ,  {payload}) {
            state.textt = [...state.textt , payload]
        },
        changeStatus(state) {
            state.status = true
        }
    },
});

export const selectPinData = state => state.pin;

export const {changeStatus,  addText} = pinSlice.actions;
export const pinData = pinSlice.reducer;