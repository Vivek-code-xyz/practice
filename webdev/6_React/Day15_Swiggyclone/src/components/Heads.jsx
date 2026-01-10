import { useSelector } from "react-redux"
import { Link } from "react-router"

export default function Heads() {

     const items = useSelector(state => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return( 
    <div className=" container mx-auto  py-4 w-full  font-sans shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)] sticky top-0 bg-white z-10">
        <div className="w-[80%] mx-auto flex justify-between">
            <img className="w-40 h-12  bg-[#ff5200] rounded-xl px-2 py-1" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png" alt="swiggyLogo" />

            <div className="font-sans text-base text-gray-700 font-bold flex gap-10 items-center ">
                <a href="https://www.swiggy.com/corporate/" target="_blank">Swiggy Corporate</a>
                <a href="https://partner.swiggy.com/login#/swiggy" target="_blank">Partner with us</a>
                <a className="border border-gray-700 py-3 px-4 rounded" href="">Get the App</a>
                <a className="py-3 px-4 text-white bg-black rounded" href="">Sign in</a>
                <Link to="/checkout">
                   <p className="border border-gray-700 py-3 px-4 rounded font-semibold flex items-center gap-2">Cart<span className="bg-green-100 text-green-700 font-bold px-2 rounded">{count}</span></p>
                </Link>
        
            </div>
        </div>
    </div>
    ) 
}