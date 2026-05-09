"use client"

import { Sun, Moon, Zap, Cloud, Flame, PartyPopper, Dumbbell, PersonStanding, LaptopMinimal, BedDouble, CarFront} from 'lucide-react';
import { useState } from "react";

export default function Sidebar(){
    const [selectedMood, setSelectedMood] = useState('')
    const [selectedActivity, setSelectedActivity] = useState('')

    return (
        <main className="md:flex">
            <section className='px-10 md:border-r md:border-t md:border-gray-300 md:pr-15 md:pt-5'>
                <h2 className='text-gray-500 font-semibold text-md uppercase text-center md:text-left'>Mood</h2>
                <div className="grid grid-cols-2 grid-rows-3 gap-4 max-w-sm md:max-w-xs mx-auto md:mx-0 mt-3">
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "happy" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("happy")}>
                            <Sun size={25} color="currentColor"/>
                            <p>Happy</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "calm" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("calm")}>
                            <Moon size={25} color="currentColor"/>
                            <p>Calm</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "pumped" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("pumped")}>
                            <Zap size={25} color="currentColor"/>
                            <p>Pumped</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "melancholic" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("melancholic")}>
                            <Cloud size={25} color="currentColor"/>
                            <p>Melancholic</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "focused" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("focused")}>
                            <Flame size={25} color="currentColor"/>
                            <p>Focused</p>
                        </div>
                        <div className={`flex flex-col items-center gap-1 border-2 border-gray-500 rounded-md p-5 cursor-pointer ${selectedMood === "party" ? "text-pink-300 border-pink-300 bg-pink-50" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedMood("party")}>
                            <PartyPopper size={25} color="currentColor"/>
                            <p>Party</p>
                        </div>
                </div>

                <h2 className='text-gray-500 font-semibold text-md uppercase text-center md:text-left mt-5'>Activity</h2>
                <div className='flex flex-col justify-center gap-4 max-w-sm mx-auto w-full mt-3 md:mx-0 md:max-w-xs'>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "yoga" ? "text-green-600 border-green-600 bg-green-100" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("yoga")}>
                        <PersonStanding size={25} color="currentColor"/>
                        <p>Morning Yoga</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "work" ? "text-green-600 border-green-600 bg-green-100" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("work")}>
                        <LaptopMinimal size={25} color="currentColor"/>
                        <p>Work / Study</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "sleep" ? "text-green-600 border-green-600 bg-green-100" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("sleep")}>
                        <BedDouble size={25} color="currentColor"/>
                        <p>Sleep</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "workout" ? "text-green-600 border-green-600 bg-green-100" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("workout")}>
                        <Dumbbell size={25} color="currentColor"/>
                        <p>Workout</p>
                    </div>
                    <div className={`flex gap-2  border-2 border-gray-500 rounded-3xl p-3 cursor-pointer ${selectedActivity === "driving" ? "text-green-600 border-green-600 bg-green-100" : "text-gray-500 border-gray-500"}`} onClick={()=> setSelectedActivity("driving")}>
                        <CarFront size={25} color="currentColor"/>
                        <p>Driving</p>
                    </div>
                </div>

            </section>
        </main>
    )
}