import { Grossaries } from "../utility/Grossaries";

export default function GrossaryCard() {

    function GrossaryData ({data}){
        return(
        <div className="flex flex-col justify-between w-40 h-60 mb-5 px-1">
           <a href={data?.action?.link}>
                <img className="w-38 h-50 object-cover min-h-50 min-w-38" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+data?.imageId} alt="" />
           </a>
           <h1 className="text-xl font-bold mb-7 text-gray-700 text-center mt-1" >{data?.action?.text}</h1>
        </div>
        )
    }


    return (
        <div className="w-[80%] container mx-auto  mt-20">
            <h1 className="text-2xl font-bold mb-7">Shop groceries on Instamart</h1>
            <div className="flex overflow-x-scroll gap-7 no-scrollbar ">
                {
                    Grossaries.map((Data) => <GrossaryData key={Data.id} data={Data}></GrossaryData>)
                }
            </div>

        </div>
    )
}