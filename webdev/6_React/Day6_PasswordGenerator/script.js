import React, { useCallback } from "react";
import ReactDOM from "react-dom/client";
import {useState,useEffect} from 'react';

function App(){
    const [password,setPassword]=useState("");
    const [length,setLength]=useState(13);
    const [numchange,setNumchange] = useState(false);
    const [charchange,setCharchange] = useState(false);

    const GeneratePassword = useCallback(()=>{
        let str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(numchange){
            str+="1234567890";
        }
        if(charchange){
            str+="+-*/.!@#$%^&*`~;:₹<>?";
        }

        let pass=""

        for(let i=0;i<length;i++){
            pass +=str[Math.floor(Math.random()*str.length)]
        }

        setPassword(pass);
    },[length,numchange,charchange]);
    


    return(
        <>
            <p>PassWord Generator</p>
            <h1>{password}</h1>
            <div className="inputs">
                <input type="range" max={50} min={5} value={length} onChange={(event)=> setLength(event.target.value)}></input>
                <label>Length({length})</label>

                <input type="checkbox" defaultChecked={numchange}  onChange={()=>setNumchange(!numchange)}></input>
                <label>Number</label>

                <input type="checkbox" defaultChecked={charchange}  onChange={()=>setCharchange(!charchange)}></input>
                <label>Charecter</label>
            </div>
            <button onClick={()=>GeneratePassword()}>Generate</button>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);