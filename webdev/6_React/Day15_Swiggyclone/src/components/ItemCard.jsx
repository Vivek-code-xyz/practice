import { useState } from "react"
import ItemDish from "./ItemDish"

export default function ItemCard({Menuitems , Select}){

    




    if("categories" in Menuitems){
        return(
            <div className="w-full">
                <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>
                <p className="font-bold text-[26px] mb-4 ">{Menuitems?.title} {"("+Menuitems?.categories?.length+")"}</p>
                <div>
                    {
                        Menuitems?.categories?.map((item)=><ItemCard key={item?.title} Menuitems={item} Select={Select}/>)
                    }
                </div>
            </div>
        )
    }


    const [isOpen,setIsOpen]= useState(true)

    if(!isOpen){
        return(
            <>
            
            <div className="w-full">
                <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>
                <div className="flex justify-between">
                    <p className="font-bold text-[26px] mb-4 ">{Menuitems?.title} {"("+Menuitems?.itemCards?.length+")"}</p>
                    <button className="text-2xl bg-gray-100 rounded-[50%] px-4  transition-all duration-150 ease-in-out hover:-translate-y-px active:translate-y-px shadow-md hover:shadow-lg active:shadow-inner" onClick={()=>setIsOpen(!isOpen)}>{isOpen?"▲":"▼"}</button>
                </div>
            </div>
            </>
        )
    }

    if(Select==='Veg'){
        return(
            <>
            <div className="w-full">
                <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>
                <div className="flex justify-between">
                    <p className="font-bold text-[26px] mb-4  ">{Menuitems?.title} {"("+Menuitems?.itemCards?.filter((food)=>"isVeg" in food?.card?.info).length+")"}</p>
                    <button className="text-2xl  bg-gray-100 rounded-[50%] px-4" onClick={()=>setIsOpen(!isOpen)}>{isOpen?"▲":"▼"}</button>
                </div>
                <div>
                    {
                        Menuitems?.itemCards?.filter((food)=>"isVeg" in food?.card?.info).map((items)=><ItemDish key={items?.card?.info?.id} data={items?.card?.info}/>)
                    }
                </div>
            </div>
            </>
        )
    }

    if(Select=='Non-Veg'){
        return(
            <>
            <div className="w-full">
                <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>
                <div className="flex justify-between">
                    <p className="font-bold text-[26px] mb-4  ">{Menuitems?.title} {"("+Menuitems?.itemCards?.filter((food)=>!("isVeg" in food?.card?.info)).length+")"}</p>
                    <button className="text-2xl  bg-gray-100 rounded-[50%] px-4" onClick={()=>setIsOpen(!isOpen)}>{isOpen?"▲":"▼"}</button>
                </div>
                <div>
                    {
                        Menuitems?.itemCards?.filter((food)=>!("isVeg" in food?.card?.info)).map((items)=><ItemDish key={items?.card?.info?.id} data={items?.card?.info}/>)
                    }
                </div>
            </div>
            </>
        )
    }

    return(
        <>
        
        <div className="w-full">
            <div className="w-full bg-gray-200 h-4 my-8 rounded-2xl"></div>
            <div className="flex justify-between">
                <p className="font-bold text-[26px] mb-4  ">{Menuitems?.title} {"("+Menuitems?.itemCards?.length+")"}</p>
                <button className="text-2xl  bg-gray-100 rounded-[50%] px-4" onClick={()=>setIsOpen(!isOpen)}>{isOpen?"▲":"▼"}</button>
            </div>
            <div>
                {
                    Menuitems?.itemCards?.map((items)=><ItemDish key={items?.card?.info?.id} data={items?.card?.info}/>)
                }
            </div>
        </div>
        </>
    )
}