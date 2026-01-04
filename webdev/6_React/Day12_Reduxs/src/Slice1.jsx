import {createSlice} from "@reduxjs/toolkit"

const Slicer = createSlice(
    {
        name: "slice1",
        initialState : {count:0},
        reducers :{
            Increment : (s)=>{s.count+=1},
            Decrement : (s)=>{s.count-=1},
            Reset  :(s)=>{s.count=0},
            customIncrease : (s,actions)=>{s.count += actions.payload}
           
        }
    }
)

export default Slicer.reducer;
export const {Increment,Decrement,Reset,customIncrease} = Slicer.actions;