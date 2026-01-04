import React,{useState} from "react";
import ReactDOM from "react-dom/client"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import {Increment,Decrement,Reset,customIncrease} from "./Slice1"
import { Provider } from "react-redux";
import stores from "./Store";
function App(){
    
  function Counter(){

    const count = useSelector((globalState)=> globalState.slice1.count);
    const dispatch = useDispatch();
    
    return(
      <>
      <div className="counter">Counter is : {count}</div>
      <button onClick={()=>dispatch(Increment())}>Increment</button>
      <button onClick={()=>dispatch(Decrement())}>Decrement</button>
      <button onClick={()=>dispatch(Reset())}>Reset</button>
      </>
    )
  }

  function Costom(){
      const[num,setNum]=useState("");
      const dispatch = useDispatch();

    return (
      <>
      <input type="number" value={num}  onChange={(e)=>setNum(e.target.value)}/>
      <button onClick={()=>{dispatch(customIncrease(Number(num)))
        setNum("");
      }}>increase</button>
      </>
    )
  }

  return(
    <>
      <Provider store={stores}>
      <Counter></Counter>
      <br />
      <Costom></Costom>
      </Provider>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);