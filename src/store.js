import { configureStore } from "@reduxjs/toolkit";
import  { orderSlice, userSlice } from "./redux/userSlice";

const store = configureStore({
    reducer:{
     user: userSlice.reducer,
     order: orderSlice.reducer
    }
 })
 
 export default store;