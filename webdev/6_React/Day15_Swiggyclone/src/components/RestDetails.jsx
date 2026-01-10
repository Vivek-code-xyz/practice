import { useParams,Link } from "react-router"
import { useState ,useEffect } from "react"
import ItemCard from "./ItemCard"
import RestShimmer from "./RestShimmer"




export default function RestDetails(){
    let {id} = useParams()

    const [RestInfo,setRestInfo] = useState([])
    const [RestName,setRestName] = useState("");
    const [Select,setSelect] = useState(null)
        useEffect(()=>{
    
            async function fetchdata(){
                const Proxyserver = "https://cors-anywhere.herokuapp.com/"
                const Swiggyserver = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.29040&lng=70.79150&restaurantId=${id}`
                const Swiggyserver2 = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.29040&lng=70.79150&restaurantId=${id}`
                const response = await fetch(Proxyserver+Swiggyserver2);
                const data = await response?.json();

                const Restname = data?.data?.cards[0]?.card?.card?.text;
                const tempdata = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                const filteredData = tempdata?.filter((item)=>'title' in item?.card?.card)
                setRestInfo(filteredData);
                setRestName(Restname)
                // console.log(data);
                // console.log(Restname);
            }
    
            fetchdata()
        },[])

       if(RestInfo.length == 0){
               return <RestShimmer/>
        }


    return(
        <>
           
            <div className="w-[80%] mx-auto my-12 text-6xl font-bold text-gray-700">{RestName}</div>

            <div className="w-[80%] mx-auto my-12 text-xl  text-center">
                <Link to={`/city/Rajkot/${id}/search`}>
                <p className="w-full bg-gray-200 py-4 text-gray-600 rounded transition-transform duration-150  ease-in-out hover:scale-95 active:scale-90 active:translate-y-px shadow-md hover:shadow-sm active:shadow-inner">Search For Dishes</p>
                </Link>
            </div>

            <div className="flex gap-5 w-[80%] mx-auto">
                <div className="text-[24px] font-bold  text-gray-700 ">Filters : </div>
                <button className={`px-4 py-1 rounded-xl  text-gray-700 font-bold text-xl shadow-[0_2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.15)] active:translate-y-px active:shadow-[0_1px_2px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.15)] transition 
                        ${Select==="Veg" ?"bg-green-700 text-white":"bg-gray-200" }`} onClick={()=>setSelect(Select==="Veg"?null:"Veg")}>Veg</button>

                <button className={`px-2 py-1 rounded-xl  text-gray-700 font-bold text-xl shadow-[0_2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.15)] active:translate-y-px active:shadow-[0_1px_2px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.15)] transition
                         ${Select==="Non-Veg"?"bg-red-700 text-white" : " bg-gray-200"}`} onClick={()=>setSelect(Select==="Non-Veg"?null:"Non-Veg")}>Non-Veg</button>

            </div>

            <div className="w-[80%] mx-auto">
                {
                    RestInfo?.map((Menuitems)=><ItemCard key={Menuitems?.card?.card?.title} Menuitems ={Menuitems?.card?.card} Select={Select} />)
                }
            </div>
            
            

        </>
    )
}