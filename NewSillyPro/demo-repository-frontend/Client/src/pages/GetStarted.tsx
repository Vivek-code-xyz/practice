import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom";
import StartedNav from "@/components/StartedNav";
import PlanetScene from "@/components/PlanetScene";
import StartButton from "@/components/StartButton";


const GetStarted = () => {


    return (
        <div className="bg-black w-full cursor-custom select-none overflow-hidden relative">
            <header className="absolute top-0 left-0 w-full z-50">
                <StartedNav />
            </header>
            <main className="w-full">
                <PlanetScene />
                
                
                
                <StartButton/>
            </main>
        </div>
    );
};

export default GetStarted;