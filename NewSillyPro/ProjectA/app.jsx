import {useState,useEffect} from "react"
import ReactDOM from "react-dom/client"

function App(){

    const [usertyped,setUsertyped] = useState("")

    const [movieData,setMovieData] = useState([])
    const [loading,setLoading] = useState(false)
    const [errormsg,setErromsg] = useState("")
    const [hasSearch,setHasSearch]= useState(false)
    const [favs, setFavs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // const [ready, setReady] = useState(false);


    //Saved To local Storage
    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem('favs'));
        if(saved) setFavs(saved)
        // setReady(true);
    },[])
    useEffect(()=>{
        localStorage.setItem('favs',JSON.stringify(favs))
    },[favs])


    async function fetchdata(){
        if(usertyped.trim()==="") return;

        setLoading(true);
        setErromsg("");
        setMovieData([]);

        try{
            const res = await fetch(`https://www.omdbapi.com/?s=${usertyped}&apikey=e40f39d1`)
            const data = await res.json()

            if(data.Response === "False"){
                setErromsg(data.Error)
            }
            else{
                setMovieData(data.Search)
                console.log(data)
            }
        } catch (err) {
            setErromsg("Network error");
        }
        setLoading(false)
        setHasSearch(true)
    }

    function toggleFav(movie) {
        const exists = favs.find(f => f.imdbID === movie.imdbID);

        if (exists) {
            setFavs(favs.filter(f => f.imdbID !== movie.imdbID));
        } else {
            setFavs([...favs, movie]);
        }
    }

    function isFav(id) {
        return favs.some(f => f.imdbID === id);
    }

    function openMovie(movie) {
        setSelected(movie);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setSelected(null);
    }

    useEffect(() => {
        if (!selected) return;

        async function fetchDetails() {
            const res = await fetch(`https://www.omdbapi.com/?i=${selected.imdbID}&apikey=e40f39d1`);
            const data = await res.json();
            setSelected(data);
        }

        fetchDetails();
    }, [selected?.imdbID]);




    return(<>
        <div className="app">
            <div className="title">Movie Explorer</div>
            <div className="userinputs">
                <input type="text" placeholder="Enter Movie Name" value={usertyped} onChange={(e)=> setUsertyped(e.target.value)} />
                <button onClick={fetchdata}>Search</button>
            </div>

            <div className="intermediate">
                {loading && <p className="info">Searching movies...</p>}
                {!loading && errormsg && <p className="error">{errormsg}</p>}
                {!loading && !errormsg && movieData.length === 0 && hasSearch &&(
                <p className="info">No movies found</p>
                )}
            </div>
            
            
            


            <div className="grid" >
                {
                    movieData.map((m,i)=>(
                        <div className="card" key={`${m.imdbID}-${i}`} onClick={() => openMovie(m)}>
                            <img src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"} alt={m.Title} />
                            <h4>{m.Title}</h4>
                            <p>{m.Year}</p>
                            <button className="fav-btn" onClick={(e) => {e.stopPropagation(); toggleFav(m)}}> {isFav(m.imdbID) ? "❤️" : "🤍"} </button>
                        </div>
                    ))
                }
            </div>

            {favs.length > 0 && (
                <>
                    <h3 className="fav-title">❤️ Your Favorites</h3>

                    <div className="fav-row">
                        {favs.map((m, i) => (
                            <div className="fav-card" key={`${m.imdbID}-${i}`}>
                                <img
                                    src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"}
                                    alt={m.Title}
                                />
                                <p>{m.Title}</p>
                                <button className="fav-btn" onClick={(e) => {e.stopPropagation(); toggleFav(m)}}> {isFav(m.imdbID) ? "❤️" : "🤍"} </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showModal && selected && (
                <div className="modal-bg" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close" onClick={closeModal}>✖</button>
                        <img src={selected.Poster} alt={selected.Title} />

                        <div className="descriptions">
                            <h2>{selected.Title}</h2>
                            <p>{selected.Plot}</p>
                            <p><b>Year:</b> {selected.Year}</p>
                        </div>
                        
                    </div>
                </div>
            )}
            
        </div>
    </>)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)