import react,{useState,useEffect} from "react"
import reactDOM from "react-dom/client"


function App(){

    const [title,setTitle] = useState("")
    const [note,setNote] = useState("")
    const [noteData,setNoteData] = useState([])

    function addNote(){
        if(title === "" || note === "") return
        const now = new Date();
        const newnote = {
            id : Date.now(),
            title,
            note,
            time: now.toLocaleTimeString([],{hour:'2-digit',minute:"2-digit"}),
            date: now.toLocaleDateString()
        };

        setNoteData([newnote,...noteData])
        setTitle("")
        setNote("")
    }

    function deleteNote(id){
        const newNoteData = noteData.filter(item=>item.id !== id)
        setNoteData(newNoteData)
    }

    // load saved data from localstorage when app starts
    useEffect(()=>{
        const savedNoteData = JSON.parse(localStorage.getItem("notes"));
        if (savedNoteData) setNoteData(savedNoteData)
    },[])

    //save the notes data to local storage upon change in noteData list
    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(noteData))
    },[noteData])


    return(
        <>
        <div className="app">
            <h1>Notes Keeper App</h1>
            <div className="form">
                <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <textarea type="text" placeholder="Write Notes" value={note} onChange={(e)=>setNote(e.target.value)} />
                <button onClick={addNote}>ADD</button>
            </div>

            <div className="grid">
                {
                    noteData.map((n)=>(
                        <div className="card" key={n.id}>
                            <h3>{n.title}</h3>
                            <p>{n.note}</p>
                            <div className="datetime">
                                <span>{n.time} | {n.date}</span>
                            </div>
                            <button onClick={()=>deleteNote(n.id)}>✖</button>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}




reactDOM.createRoot(document.getElementById('root')).render(<App/>)