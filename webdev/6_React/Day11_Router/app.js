import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import BackgroundChanger from "./src/BackgroundChanger";
import ClickTracker from "./src/ClickTracker";
import Counter from "./src/Counter";
import DigitalClock from "./src/DigitalClock";
import RandomQuote from "./src/RandomQuote";
import Stopwatch from "./src/Stopwatch";
import ToggleText from "./src/ToggleText";
import Welcome from "./src/Welcome";
import CharacterCounter from "./src/charcounter";
import ThemeToggle from "./ThemeToggle";
import SimpleTodo from "./Simpletodo";


function App(){


    return(
       <BrowserRouter>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/backgroundChanger">BackgroundChanger</Link>
            
            <Link to="/counter">Counter </Link>
           
            <Link to="/randomquote">RandomQuote </Link>
            <Link to="/stopwatch">Stopwatch </Link>
            
            <Link to="/charcounter">CharacterCounter</Link>
            <Link to="/themetoggle">ThemeToggler</Link>
            <Link to="/simpletodo">Simple ToDo</Link>
            
            </nav>
            <Routes>
                <Route index element={Welcome()}></Route>
                <Route path="/backgroundChanger" element={BackgroundChanger()}></Route>
               
                <Route path="/counter" element={Counter()}>
                    <Route path="clicktracker" element={ClickTracker()}></Route>
                </Route>
                
                <Route path="/randomquote" element={RandomQuote()}></Route>
                <Route path="/stopwatch" element={Stopwatch()}>
                    <Route path="digitalclock" element={DigitalClock()}></Route>
                </Route>
                
                <Route path="/charcounter" element={CharacterCounter()}></Route>
                <Route path="/themetoggle" element={ThemeToggle()}>
                    <Route path="toggletext" element={ToggleText()}></Route>
                </Route>
                <Route path="/simpletodo" element={SimpleTodo()}></Route>
            </Routes>
       </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <App/>
    
)