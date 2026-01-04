import React ,{useState} from "react";
import ReactDOM from "react-dom/client";
import Add from "./Add";

function App(){

    const [lang , setLang] = useState(["JS","TS","JAVA","C++"]);
    function handleClick(){
        setLang(["C",...lang]);
    }
    return (
        <>
        <div className="abc">
            {lang.map((val,idx)=><Add key={val} value = {val}></Add>)}
        </div>
        <button onClick={handleClick}>Add Language</button>
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>)