import React from "react";
import {useState,useEffect} from "react";

function Counter(){
  
    const [count,setcount] = useState(0);
    return(

        <div className="counter">
            <h1>Counter : {count}</h1>
            <button onClick={(()=>setcount(count+1))}>Increment</button>
            <button onClick={(()=>setcount(count-1))}>Decrement</button>
            <button onClick={(()=>setcount(0))}>Clear</button>
        </div>
 
    )
}

export default React.memo(Counter);