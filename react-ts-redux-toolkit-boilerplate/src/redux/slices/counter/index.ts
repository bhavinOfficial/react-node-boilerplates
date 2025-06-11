import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    initialState: 0,
    name: "counter",
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
        incrementByValue: (state, action) => state + action.payload,
        decrementByValue: (state, action) => state - action.payload,
    }
});

export const { increment, decrement, incrementByValue, decrementByValue } = counterSlice.actions;
export default counterSlice.reducer;