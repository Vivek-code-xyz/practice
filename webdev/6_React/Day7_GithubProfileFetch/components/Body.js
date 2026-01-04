import React , {useState,useEffect, useCallback} from "react";


export default function Body(){
    const [ProfileCount,setProfileCount]=useState("")
    const [Profile,setProfile] = useState([])
    const [user,setUser] = useState("");
    const randomNo =  Math.floor(Math.random() * 7731);
    const [loading, setLoading] = useState(false);

    async function FindUser(user){
        try{
            const response = await fetch(`https://api.github.com/users/${user}`);
            if (response.status === 404) {
                throw new Error("User does not exist");
            }

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            if (response.status === 403) {
                throw new Error("GitHub API rate limit exceeded. Try later.");
            }


            const data = await response.json();
            setProfile([data]);
        }
        catch(e){
            alert(e.message);
        }
    }

    async function GenerateProfile(count){

        try{
            if (isNaN(count) || count <= 0) {
                throw new Error("Input must be a positive number");
            }


            const response = await fetch(`https://api.github.com/users?since=${randomNo}&per_page=${count}`);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            if (response.status === 403) {
                throw new Error("GitHub API rate limit exceeded. Try later.");
            }

            const data = await response.json();

            setProfile(data);
        }
        catch(e){
            alert(e.message);
        }
    }


    const SkeletonCard=useCallback(()=>{
        return (
            <div className="cards skeleton">
                <div className="avatar"></div>
                <div className="line"></div>
                <div className="line small"></div>
            </div>
        );
    },[]) 




    useEffect(()=>{
        GenerateProfile(12);
    },[])

    return(
        <>
        
        <div className="inputs">
            <input type="text" placeholder="Enter No. of Profiles to Display" value={ProfileCount} onChange={(e)=>setProfileCount(e.target.value)}></input>
            <button onClick={()=>GenerateProfile(Number(ProfileCount))}>Display</button>
            <span>                 </span>
            <input type="text" placeholder="Enter Username" value={user} onChange={(e)=>setUser(e.target.value)}></input>
            <button onClick={()=>FindUser(user)}>Find</button>
        </div>
        
        <div className="body">
            {
                loading 
                ?Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
                ))

                : Profile.map((arr)=>{
                    return(
                       <div key={arr.id} className="cards">
                            <img src={arr.avatar_url}></img>
                            <h2>{arr.login}</h2>
                            <a href={arr.html_url} target="_blank"> 🔗Visit Profile</a>
                       </div>
                    )
                })
            }
        </div>
        
        </>
    )
}