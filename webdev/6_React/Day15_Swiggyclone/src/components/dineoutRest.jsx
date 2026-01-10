import { BestDineRestorents } from "../utility/bestRestorents";


export default function DineoutRest() {

    function Dinecard({ Restdata }) {
        const str = (Restdata?.info?.customerOffer?.info?.description)
        return (
            <a href={Restdata?.cta?.link} target="_blank">
                <div >
                    <div className="min-w-81 w-81 min-h-47 h-47 object-cover relative rounded-2xl">
                        <div className="abosolute overflow-hidden after:content-['']  after:absolute after:bottom-0 after:left-0 after:w-full after:h-[35%]  after:bg-linear-to-t  after:from-black/80 after:to-transparent   after:pointer-events-none" > </div>
                        <img className="h-47 w-81 rounded-2xl" src={"https://media-assets.swiggy.com/swiggy/image/upload/" + Restdata?.info?.mediaFiles[0]?.url} alt="" />
                        <span className="absolute font-bold text-xl bottom-2 left-2 text-white w-[75%]">{Restdata?.info?.name}</span>
                        <span className="absolute font-bold text-base text-white bottom-2 right-2">{Restdata?.info?.rating?.value}</span>

                    </div>
                    <div className="min-w-81 w-81 min-h-47 h-47 flex flex-col justify-evenly border border-gray-400 rounded-b-2xl pt-2 pb-3 px-3" >
                        <div className="flex justify-between  text-[#02060C99] text-3 mt-1">
                            <p>{Restdata.info.cuisines[0]}·{Restdata.info.cuisines[1]}</p>
                            <p>{Restdata.info.costForTwo}</p>
                        </div>
                        <div className="flex justify-between  text-[#02060C99] text-3">
                            <p>{Restdata.info.locality},{Restdata.info.locationInfo.city.name}</p>
                            <p>{Restdata.info.locationInfo.distanceString}</p>
                        </div>
                        <div className="bg-[#F0F0F5] px-2 py-0.5 rounded-xl text-[#02060C99] text-3 inline-block mt-2">
                            ✔ Table Booking
                        </div>

                        <div className="w-full h-9 bg-[#1BA672] text-white rounded-xl px-2 flex justify-between items-center font-bold mt-3">
                            
                                <p>{(Restdata?.info?.offerInfoV2?.otherOffers?.offers[0]?.header)?(Restdata?.info?.offerInfoV2?.otherOffers?.offers[0]?.header):"FLAT 0% OFF"} on walks in</p>
                                <p>+{Restdata?.info?.vendorOffer?.offerCount} more</p>
                        </div>

                        <div className="w-full h-9 bg-[#C8F9E5] pl-2 text-[#1BA672] text-base mt-3 rounded-xl flex items-center">
                                <p> Discount {str.slice(2)}</p>
                        </div>
                    </div>
                </div>
            </a>
        )
    }


    return (
        <div className="w-[80%] container mx-auto  mt-20">
            <h1 className="text-2xl font-bold mb-2">Discover best restaurants on Dineout</h1>
            <div className="flex flex-nowrap overflow-x-auto mt-5 gap-5 no-scrollbar::-webkit-scrollbar no-scrollbar mb-10">
                {
                    BestDineRestorents.map((Restdata) => <Dinecard key={Restdata?.info?.id} Restdata={Restdata} />)
                }

            </div>

        </div>
    )
}