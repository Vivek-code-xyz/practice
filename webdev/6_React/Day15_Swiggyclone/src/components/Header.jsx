import { Link } from "react-router"


export default function Header(){


    return(
        <header className="bg-[#ff5200] font-sans ">
        <div className="flex justify-between container mx-auto  py-8 max-w-7xl">
            <img className="w-40 h-12" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png" alt="swiggyLogo" />

            <div className="font-sans text-base text-white font-bold flex gap-10 items-center ">
                <a href="https://www.swiggy.com/corporate/" target="_blank">Swiggy Corporate</a>
                <a href="https://partner.swiggy.com/login#/swiggy" target="_blank">Partner with us</a>
                <a className="border border-white py-3 px-4 rounded" href="">Get the App</a>
                <a className="py-3 px-4 bg-black rounded" href="">Sign in</a>
            </div>
        </div>

        <div className="pt-16 pb-8 relative">
            <img className="absolute left-0 top-0 h-112 w-62" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" />
            <img className="absolute right-0 top-0 h-112 w-62" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" alt="" />
            <div className="text-white text-5xl font-bold max-w-[60%] container mx-auto text-center leading-tight">Order food & groceries. Discover<br></br>best restaurants. Swiggy it!</div>
            <div className="max-w-[70%] container mx-auto flex gap-5 mt-10 justify-center">
                <input className="bg-white text-xl h-14 rounded-2xl w-[30%] px-8 py-4" type="text" placeholder="Enter your delivery location" />
                <input className="bg-white text-xl h-14 rounded-2xl w-[50%] px-8 py-4" type="text" placeholder="Search for restaurent,item or more" />

            </div>
        </div>

        <div className="max-w-[80%] container mx-auto flex justify-center mb-5 ">
            <Link  to="/restaurents"><img className="w-81.5 h-75" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="Food Delivery" /></Link>
            <a  href="https://www.swiggy.com/instamart?entryId=1234&entryName=mainTileEntry4&v=1" target="_blank"><img className="w-81.5 h-75" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="Food Delivery" /></a>
            <a  href="https://www.swiggy.com/dineout" target="_blank"><img className="w-81.5 h-75" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="Food Delivery" /></a>

        </div>
        
        </header>
    )
}