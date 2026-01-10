import { Link } from "react-router"


export default function RestCard({RestObj}){
    return(
        <Link to = {"/city/Rajkot/"+RestObj?.info?.id} >
        <div className="max-w-72 px-1 transform transition duration-200 hover:scale-95">
            <img className="w-70 h-45 object-cover rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+RestObj.info.cloudinaryImageId} alt="" />
            <div className="w-[95%] mx-auto">
                <div className="font-bold mt-3 text-[15px] text-[#02060ceb] ">{RestObj.info.name}</div>
                <div className="text-[#02060ceb] text-[15px] font-bold flex items-center"><strong className="text-green-500 text-2xl" >⍟</strong>  {RestObj.info.avgRating} • {RestObj.info.sla.slaString}</div>
                <div className="text-[#02060c99] text-[15px] whitespace-nowrap mr-2 overflow-x-hidden">{RestObj.info.cuisines.join(",")}</div>
                <div className="text-[#02060c99] text-[15px] whitespace-nowrap mr-2 overflow-x-hidden">{RestObj.info.areaName}</div>
            </div>
        </div>
        </Link>
        
    )
}