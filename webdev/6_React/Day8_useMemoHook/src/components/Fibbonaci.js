import {useState,useEffect,useCallback,useMemo} from 'react';


    function fibbcalc(n){
        if(n<=1) return n;

        return fibbcalc(n-1)+fibbcalc(n-2);
    }

    
export default function Fibbonaci(){

    const [num,setNum] = useState(0);



    
    const result = useMemo(()=>fibbcalc(num),[num])

    return(
        <div className='fibb'>
            <h1>{num}th Fibbonaci is : {result}</h1>
            <input type='number' value={num} onChange={(e)=>setNum(e.target.value)}></input>
        </div>
    )
}