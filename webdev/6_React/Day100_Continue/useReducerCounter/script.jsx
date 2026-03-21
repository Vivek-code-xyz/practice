import ReactDOM from "react-dom/client"
import { useReducer } from "react"

function App(){

    function redfunc(state,action){
        if(action.type === "Increment")
            return {value:state.value+1}
        if(action.type === "Decrement")
            return {value:state.value-1}
        
    }
    

    const [state,dispatch] =  useReducer(redfunc,{value:0})
    return(
        <div>
            <h1>Counter : {state.value}</h1>
            <button onClick={()=>{dispatch({type:"Increment"})}}>Increment</button>
            <button onClick={()=>{dispatch({type:"Decrement"})}}>Decrement</button>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)