import { configureStore } from "@reduxjs/toolkit";
import slice1reducers from "./Slice1";

const store = configureStore({
    reducer :{
        slice1 : slice1reducers
    }
})

export default store ;