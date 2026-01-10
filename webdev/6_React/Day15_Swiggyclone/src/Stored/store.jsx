import { configureStore } from "@reduxjs/toolkit";
import CartReducers from "./cardSlicer";

export const store = configureStore({
    reducer:{
        cart : CartReducers,
    }
})