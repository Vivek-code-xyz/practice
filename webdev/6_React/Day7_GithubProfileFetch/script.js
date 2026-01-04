import React , {useCallback,useState,useEffect} from "react";
import ReactDOM from 'react-dom/client'

import Header from "./components/Header";
import Body from "./components/Body";

function App(){
    return(
        <>
        <Header/>

        <Body/>
        
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)