"use client"

import { Sun, Moon, Zap, Cloud, Flame, PartyPopper, Dumbbell, PersonStanding, LaptopMinimal, BedDouble, CarFront, Sparkles} from 'lucide-react';
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function Sidebar(){
    const [selectedMood, setSelectedMood] = useState('')
    const [selectedActivity, setSelectedActivity] = useState('')
    const [selectedEnergy, setSelectedEnergy] = useState([5])

    const handleGenerate = async() =>{
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              mood: selectedMood,
              activity: selectedActivity,
              energy: selectedEnergy
            })
          })
        
          const data = await res.json()
          console.log(data)
    }


    return (
        <main className="md:flex">
            <section className='px-10 md:border-r md:border-t md:border-gray-300 md:pr-15 md:pt-5 pb-5'>
                <h2 className='text-gray-500 font-semibold text-md uppercase text-center md:text-left'>Mood</h2>
                <div className="grid grid-cols-2 grid-rows-3 gap-4 max-w-sm md:max-w-xs mx-auto md:mx-0 mt-3">
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "happy" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("happy")}>
                            <Sun size={25} color="currentColor"/>
                            <p>Happy</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "calm" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("calm")}>
                            <Moon size={25} color="currentColor"/>
                            <p>Calm</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "pumped" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("pumped")}>
                            <Zap size={25} color="currentColor"/>
                            <p>Pumped</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "melancholic" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("melancholic")}>
                            <Cloud size={25} color="currentColor"/>
                            <p>Melancholic</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "focused" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("focused")}>
                            <Flame size={25} color="currentColor"/>
                            <p>Focused</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "party" ? "text-green-400 border-green-400 bg-green-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("party")}>
                            <PartyPopper size={25} color="currentColor"/>
                            <p>Party</p>
                        </div>
                </div>

                <h2 className='text-gray-500 font-semibold text-md uppercase text-center md:text-left mt-7'>Activity</h2>
                <div className='flex flex-col justify-center gap-4 max-w-sm mx-auto w-full mt-5 md:mx-0 md:max-w-xs'>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "yoga" ? "text-purple-300 border-purple-300 bg-purple-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("yoga")}>
                        <PersonStanding size={25} color="currentColor"/>
                        <p>Morning Yoga</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "work" ? "text-purple-300 border-purple-300 bg-purple-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("work")}>
                        <LaptopMinimal size={25} color="currentColor"/>
                        <p>Work / Study</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "sleep" ? "text-purple-300 border-purple-300 bg-purple-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("sleep")}>
                        <BedDouble size={25} color="currentColor"/>
                        <p>Sleep</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "workout" ? "text-purple-300 border-purple-300 bg-purple-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("workout")}>
                        <Dumbbell size={25} color="currentColor"/>
                        <p>Workout</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "driving" ? "text-purple-300 border-purple-300 bg-purple-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("driving")}>
                        <CarFront size={25} color="currentColor"/>
                        <p>Driving</p>
                    </div>
                </div>

                <h2 className='text-gray-500 font-semibold text-md uppercase text-center md:text-left mt-7'>Energy level</h2>
                <div className='flex justify-center items-center gap-5 mt-5 max-w-sm mx-auto w-full'>
                    <span className='text-gray-500 text-lg text-center'>Low</span>
                    <Slider.Root
                        className="relative flex items-center w-full h-5"
                        value={selectedEnergy}
                        onValueChange={setSelectedEnergy}
                        max={10}
                        step={1}
                        >
                        <Slider.Track className="bg-green-200 relative grow rounded-full h-2">
                            <Slider.Range className="absolute bg-green-300 rounded-full h-full" />
                        </Slider.Track>

                        <Slider.Thumb className="block w-5 h-5 bg-white border-3 border-green-400 rounded-full shadow-md cursor-pointer" />
                    </Slider.Root>
                    <span className='text-gray-500 text-lg text-center'>High</span>
                </div>
                <button onClick={handleGenerate} className="flex items-center gap-2 text-xl md:text-md font-semibold text-slate-800 border-3 rounded-xl p-3 mt-10 mx-auto cursor-pointer hover:text-white hover:bg-slate-800 transition-all duration-300"> <Sparkles size={30} color="currentColor"/> Generate playlist</button>

            </section>
        </main>
    )
}