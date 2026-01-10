import {addItem,incrementItem,decrementItem} from "../Stored/cardSlicer"
import {useDispatch} from "react-redux"
import { useState } from "react"
import { useSelector } from "react-redux";


   export default function ItemDish({data}){

        // const [coun,setCount] = useState(0)
        const dispatch = useDispatch();
        const items = useSelector(state => state.cart.items);

        const element = items.find(item=>item.id===data.id)
        const count = element?element.quantity:0;

        function handleAddItem(){
            // setCount(1)
            dispatch(addItem(data))
        }

        function handleIncrementItem(){
            // setCount(count+1)
            dispatch(incrementItem(data))
        }

        function handleDecrementItem(){
            // setCount(count-1)
            dispatch(decrementItem(data))
        }

        return(<>
       
            <div className="flex w-full justify-between my-6">
                <div className="w-[70%]">
                    <p className="font-bold mb-2 text-[18px] text-gray-900">{data?.name}</p>
                    <p className="mb-2 font-bold text-base text-gray-700">₹{Math.ceil(((data?.defaultPrice)?(data?.defaultPrice):(data?.price))/100)}</p>
                    <span className="mb-2 font-bold text-[14px] flex items-center justify-start gap-1"><strong className="text-green-500 text-[20px]" >✪</strong> {data?.ratings?.aggregatedRating?.rating} {"("+((data?.ratings?.aggregatedRating?.ratingCountV2)?(data?.ratings?.aggregatedRating?.ratingCountV2):'No Ratings available')+")"}</span>
                    <p className="text-[#02060c99]">{data?.description}</p>
                </div>
                <div className="w-[20%]  relative">
                    <img className="w-full h-[90%] object-cover rounded-xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+data.imageId} alt="Food item Image" />
                    <div className="absolute bottom-0  left-1/2 -translate-x-1/2 text-green-600 bg-white text-center px-2 w-[40%] py-1.5 text-xl rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.12)] hover:bg-gray-100  active:translate-y-0.5 font-semibold transition-all duration-150" >
                    {
                        (count===0)? <div className="w-full" onClick={()=>handleAddItem()}>ADD</div> : <div className="w-full flex justify-between">
                            <button className="w-[30%] text-center justify-self-start hover:bg-gray-200" onClick={()=>handleDecrementItem()}>-</button>
                            <span className="text-center">{count}</span>
                            <button className="w-[30%] text-center justify-self-end hover:bg-gray-200" onClick={()=>handleIncrementItem()}>+</button>
                        </div>
                    }
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-300 h-0.5 my-6 rounded-2xl"></div>
             </>
        )
    }