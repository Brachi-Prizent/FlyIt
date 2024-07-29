import { configureStore } from "@reduxjs/toolkit";
import  { orderSlice, userSlice } from "./redux/userSlice";
import {placesSlice} from "./redux/placesSlice";

const store = configureStore({
    reducer:{
     user: userSlice.reducer,
     order: orderSlice.reducer,
     allPlaces: placesSlice.reducer,
    }
 })
 
 export default store;