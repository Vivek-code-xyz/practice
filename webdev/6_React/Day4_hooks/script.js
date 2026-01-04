import React,{useState} from "react";
import ReactDOM from 'react-dom/client'

function Counter(){
    let [Count,updatecount]= useState(0);
    
    
    function incrementer(){
        Count++;
        updatecount(Count);
    }
    
    function decrementer(){
        Count--;
        updatecount(Count);
    }

    return (
        <div className="box">
            <h1>Count : {Count} </h1>
            <button onClick={incrementer}>Increment</button>
            <button onClick={decrementer}>Decrement</button>
        </div>
    )
}

const Rroot = ReactDOM.createRoot(document.getElementById('root'));

Rroot.render(<Counter/>);