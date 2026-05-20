"use client"

import { useState } from "react"

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PlaylistPanel from "@/components/PlaylistPanel";
import type { Track } from "./types";


export default function Home() {
  const [tracks,setTracks] = useState<Track[]>([])
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')

  return (
    <>
       <Navbar/>
       <div className="flex flex-col md:flex-row md:border-t md:border-gray-300">
          <Sidebar 
              setTracks={setTracks}
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
          />
          <PlaylistPanel 
               tracks={tracks}
               mood={selectedMood}
               activity={selectedActivity}
          />
       </div>
    </>
  );
}
