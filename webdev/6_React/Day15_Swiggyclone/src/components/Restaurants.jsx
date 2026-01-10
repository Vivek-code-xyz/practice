import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";
import FoodOptions from "./FoodOptions";
import Heads from "./Heads";
import Footer from "./Footer"


export default function Restaurants(){
    const [RestObj,setRestObj] = useState([])
    useEffect(()=>{

        async function fetchdata(){
            const Proxyserver = "https://cors-anywhere.herokuapp.com/"
            const Swiggyserver = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.29040&lng=70.79150&is-seo-homepage-enabled=true"
            const Swiggyserver2 = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.29040&lng=70.79150&is-seo-homepage-enabled=true"
            const response = await fetch(Proxyserver+Swiggyserver);
            const data = await response.json();
            setRestObj(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }

        fetchdata()
    },[])
    
    if(RestObj.length == 0){
        return <Shimmer/>
    }

    console.log(RestObj);

    return(
    <>  
        
        <FoodOptions></FoodOptions>
        <div className="text-2xl font-bold mt-20 w-[80%] mx-auto container">Top Restaurant chain in City</div>
        <div className="flex flex-wrap mt-20 w-[80%] mx-auto container gap-5 mb-20">
            {
                RestObj?.map((Restdata)=><RestCard key={Restdata?.info?.id} RestObj={Restdata}/>)
            }
        </div>
        <Footer/>

    </>
    )
}