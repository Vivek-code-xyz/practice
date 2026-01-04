import React from "react";
import {useState,useEffect} from "react";

function Colorful(){
     let [color,setColor]=useState('black');

    useEffect(()=>{
        document.body.style.backgroundColor=color;
    } , [color]);

    //useEffect(callback,dependency array)
    //this useEffect executed at very last...when all other in code is finished then callback code of the use effect will run
    // use Effect only runs when the variable of the dependency array is changed or its value is changed...if value not changed then useeffect will not run

    
    return(

        <div className="cont">
            <h1>Background Color Changer App</h1>
            <div className="buttons">
                <button style={{backgroundColor:'red'}} onClick={()=>setColor('red')}>Red</button>
                <button style={{backgroundColor:'green'}} onClick={()=>setColor('green')}>Green</button>
                <button style={{backgroundColor:'blue'}} onClick={()=>setColor('blue')}>Blue</button>
                <button style={{backgroundColor:'orange'}} onClick={()=>setColor('orange')}>Orange</button>
                <button style={{backgroundColor:'pink'}} onClick={()=>setColor('pink')}>Pink</button>
            </div>

        </div>
    
    )
}

export default React.memo(Colorful);