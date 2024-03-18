import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CurrentUser: {},
    CurrentOrder: {}
}
export const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        
        setCurrentUser: (state, action) => {
            state.CurrentUser = action.payload[0];
        },
        resetCurrentUser : (state, action) => {
            state.CurrentUser = {};
        }
    }
})

export const orderSlice = createSlice({

    name: "order",
    initialState,
    reducers: {
        setCurrentOrder: (state, action) => {
            state.CurrentOrder = action.payload;
        }
    }
})


export const {setCurrentUser, resetCurrentUser} = userSlice.actions;
export const {setCurrentOrder} = orderSlice.actions;

//export default userSlice.reducer;