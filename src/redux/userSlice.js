import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}
const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
        }
    }
})


export const {setCurrentUser} = userSlice.actions;

export default userSlice.reducer;