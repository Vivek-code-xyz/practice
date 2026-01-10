import {createSlice} from "@reduxjs/toolkit"

const cart = createSlice({
    name : 'cartslice',
    initialState:{
        items:[]
    },
    reducers:{
        addItem : (state,action)=>{
            state.items.push({...action.payload ,quantity : 1});
        },
        incrementItem : (state,action)=>{
           const obj = state.items.find(item=> item.id == action.payload.id);
           obj.quantity +=1
        },
        decrementItem : (state,action)=>{
            const obj = state.items.find(item=> item.id ==action.payload.id)
            if(obj.quantity > 1){
                obj.quantity -=1
            }
            else{
                state.items = state.items.filter(item=>item.id!=action.payload.id)
            }
        }
    }


})

export const{addItem,incrementItem,decrementItem} = cart.actions
export default cart.reducer;