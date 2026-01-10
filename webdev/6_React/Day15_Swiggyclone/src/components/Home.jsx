import Header from "./Header"
import FoodOptions from "./FoodOptions";
import DineoutRest from "./dineoutRest";
import GrossaryCard from "./Grossaries";
import Footer from "./Footer";


export default function Home(){


    return (
        <>
        
            <Header></Header>
                    
            <FoodOptions></FoodOptions>
            <GrossaryCard></GrossaryCard>
            <DineoutRest></DineoutRest>

            <div className="w-full my-15 h-65 ">
                <img className="w-full h-65" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png" alt="" />
            </div>
            <Footer/>
        </>
    )
}