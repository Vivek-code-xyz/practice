import React from "react";
import ReactDOM from "react-dom/client";

import {useState,useEffect} from "react";
import Colorful from "./Colorful";
import Counter from "./Counter";


function App(){
    return(
        <>
            
            <Counter/>
            <Colorful/>
        </>
    )
   
}



const Reroot= ReactDOM.createRoot(document.getElementById('root'));

Reroot.render(<App/>);