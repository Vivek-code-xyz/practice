import React,{useState} from "react";
import ReactDOM from "react-dom/client";
import RestDetails from "./components/RestDetails";
import Restaurants from "./components/Restaurants";
import Home from "./components/Home";
import { BrowserRouter,Routes,Route } from "react-router";
import Search from "./components/Search";
import SecHome from "./components/SecHome";
import { store } from "./Stored/store";
import { Provider} from "react-redux"
import Checkout from "./components/Checkout";

function App(){


    return (
        <>
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route element={<SecHome/>}>
                    <Route path="/restaurents" element={<Restaurants/>}></Route>
                    <Route path= "/city/Rajkot/:id" element={<RestDetails></RestDetails>}></Route>
                    <Route path= "/city/Rajkot/:id/search" element = {<Search/>}></Route>
                </Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
            </Routes>
        </BrowserRouter>
        </Provider>
        
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)