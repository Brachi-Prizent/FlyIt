import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CurrentUser: {}
}
const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        
        setCurrentUser: (state, action) => {
            state.CurrentUser = action.payload[0];
        }
    }
})

const orderSlice = createSlice({

    name: "order",
    initialState,
    reducers: {
        setCurrentOrder: (state, action) => {
            state.CurrentOrder = action.payload[0];
        }
    }
})


export const {setCurrentUser} = userSlice.actions;
export const {setCurrentOrder} = userSlice.actions;

export default userSlice.reducer;