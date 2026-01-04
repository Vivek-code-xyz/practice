import React,{useState,useEffect,useCallback,useMemo,useRef} from 'react';
import ReactDOM from 'react-dom/client';


function App(){
    const [time,setTime]=useState(0);
    const [mili,setmili]=useState(0);
    const [flag,setFlag]=useState(false);

    const RefereceOfsec = useRef(null);
    const RefereceOfmili = useRef(null);
    function start(){
        if(!flag){

            RefereceOfsec.current = setInterval(()=>{
                setTime((letestTime)=>letestTime+1);
            },1000)
            RefereceOfmili.current = setInterval(()=>{
                setmili(e=>(e+1)%100)
            },10)
            setFlag(true);
        }

    }

    function stop(){
        if(flag){

            clearInterval(RefereceOfsec.current);
            RefereceOfsec.current = null;
            clearInterval(RefereceOfmili.current)
            RefereceOfmili.current=null;

            setFlag(false);
        }
    }

    function reset(){
        stop();
        setTime(0);
        setmili(0);
    }

    return(
        <>
            <div>StopWatch (s)</div>
            <div className='display'>
                <div className='sec'>{time}</div>
                <div className='mili'>{mili}</div>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={reset}>Reset</button>
        </>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App/>);