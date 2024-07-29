import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    places: []
}
export const placesSlice = createSlice({

    name: "allPlaces",
    initialState,
    reducers: {
        
        setPlaces: (state, action) => {
            state.places = action.payload;
        }
    }
})

export const {setPlaces} = placesSlice.actions;

export default placesSlice.reducer;