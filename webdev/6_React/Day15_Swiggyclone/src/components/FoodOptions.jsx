import { imageGridCards } from "../utility/foodoptions";

export default function FoodOptions(){

    function FoodCard({data}){

        return(
           <>
           <a href={data?.action.link}>
                <img className="min-w-36 min-h-45  object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+data?.imageId} alt="" />
           </a>
           </> 
        )
    }

    return(
        <div className="w-[80%] container mx-auto  mt-20">
            <h1 className="text-2xl font-bold mb-2">Order our best food options</h1>
            <div className="flex overflow-x-scroll gap-13 no-scrollbar::-webkit-scrollbar no-scrollbar whitespace-nowrap">
            {
                imageGridCards.map((Data)=><FoodCard key={Data.id} data={Data}></FoodCard>)
            }
            </div>

        </div>
    )
}