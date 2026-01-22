import React,{useState,useEffect} from "react"
import ReactDOM from "react-dom/client"


function App(){

    const [res,setRes] = useState("")
    const [tasks,setTasks] = useState([])

    function addTask(){
        setTasks([...tasks,res])
        setRes("")
    }

    function removeTask(idx){
        const arr = tasks.filter((val,i)=>i!=idx)
        setTasks(arr)
    }

    return(
        <>
        <h1>Simple Todo List</h1>
        <div className="a">
            <input type="text" placeholder="Enter your Task Here" value={res} onChange={(e)=>setRes(e.target.value)}/>
            <button onClick={addTask}>ADD</button> 
        </div>

        <ol className="b">
            {
                tasks.map((t,i)=>
                    
                        <li key ={i}>{t}
                            <button onClick={()=>removeTask(i)}>❌</button>
                        </li>
                    
                )
            }
        </ol>
        </>
    )
}



ReactDOM.createRoot(document.getElementById('root')).render(<App/>)