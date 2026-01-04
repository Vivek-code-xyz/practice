

import React,{useState,useEffect,useCallback,useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import Counter from './components/counter';
import Fibbonaci from './components/Fibbonaci';

function App(){
    return(
        <>
            <Counter/>

            <Fibbonaci/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);