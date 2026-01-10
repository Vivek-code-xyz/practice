import { useState, useEffect } from "react"
import { useParams } from "react-router"


import ItemDish from "./ItemDish"

export default function Search() {
    const { id } = useParams()
    const [food, setFood] = useState("")

    const [RestInfo, setRestInfo] = useState([])
    const [searchDish, setSearchDish] = useState([])

    useEffect(() => {

        async function fetchdata() {
            const Proxyserver = "https://cors-anywhere.herokuapp.com/"
            const Swiggyserver = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.29040&lng=70.79150&restaurantId=${id}`
            const Swiggyserver2 = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.29040&lng=70.79150&restaurantId=${id}`
            const response = await fetch(Proxyserver + Swiggyserver2);
            const data = await response?.json();


            const tempdata = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            const filteredData = tempdata?.filter((item) => 'title' in item?.card?.card)
            setRestInfo(filteredData)


            // console.log(Restname);
        }


        fetchdata()


    }, [id])

    useEffect(() => {
        const array = [];


        for (const itm of RestInfo) {
            const arr = itm?.card?.card?.itemCards
            if (!arr) continue;

            array.push(...arr)

        }
        const searchData = []
        for (const itm of array) {
            const arr = itm?.card?.info
            if (!arr) continue;

            searchData.push(arr)
        }

        const unique = [
            ...new Map(searchData.map(i => [i.id, i])).values()
        ];
        console.log(unique);

        const searched = unique?.filter(item => item?.name?.toLowerCase().includes(food.toLowerCase()));
        setSearchDish(searched)
        console.log(searched);

    }, [food, RestInfo])

    



    return (
        <>



            <div className="w-[80%] mx-auto mt-20">
                <input className="w-full bg-gray-200 rounded px-8 py-3 text-xl" type="text" onChange={(e) => { setFood(e.target.value) }} placeholder="Search for the Food items" />
            </div>

            <div className="w-[80%] mx-auto mt-20">
                {
                    searchDish.map((items) => <ItemDish key={items?.name} data={items} />)
                }
            </div>
        </>
    )
}