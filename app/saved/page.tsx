"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Playlist } from '../types';
import { Trash } from 'lucide-react';



export default function SavedPlaylists(){
    const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([])

    function deletePlaylist(id: number){
        const newPlaylist = savedPlaylists.filter(
            (playlist) => playlist.id !==id
        )
        setSavedPlaylists(newPlaylist)
        localStorage.setItem("playlists", JSON.stringify(newPlaylist))
    }

    useEffect(()=>{
        const savedPlaylist = JSON.parse(localStorage.getItem("playlists") || "[]")
        setSavedPlaylists(savedPlaylist)
    }, [])


    return (
        <section className="px-10 py-12 md:px-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Saved playlists</h1>
            <Link href="/" className="inline-block mt-7 text-md md:text-lg font-semibold border-3 text-slate-800 rounded-4xl p-3 md:p-3 cursor-pointer hover:text-white hover:bg-slate-800 transition-all duration-300">&larr; Go back</Link>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
               {savedPlaylists.length === 0 && (
                  <p className="mt-10 text-slate-500 text-xl">
                    No saved playlists yet...
                  </p>
                )}
                {savedPlaylists.map((playlist) => (
                    <div
                    key={playlist.id}
                    className="border-2 rounded-3xl p-6 shadow-sm"
                    >
                    <h2 className="text-2xl font-semibold">
                        {playlist.mood} / {playlist.activity}
                    </h2>

                    <p className="text-slate-500 mt-2">
                        {playlist.tracks.length} tracks
                    </p>

                    <div className="mt-5 flex flex-col gap-5">
                        {playlist.tracks.slice(0, 3).map((track, index) => (
                        <div key={index} className='flex items-center gap-5'>
                            <img
                            src={track.album.images?.[0]?.url}
                            alt={track.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold text-slate-900 transition">{track.name}</p>
                                <p className="text-slate-500 text-sm mt-1">{track.artists.map(artist => artist.name).join(", ")}</p>
                             </div>
                        </div>
                        ))}
                    </div>

                    <button onClick={() => deletePlaylist(playlist.id)} className="mt-5 gap-2 flex items-center text-md md:text-lg text-slate-800 p-3 md:p-3 cursor-pointer hover:underline transition-all duration-300">
                         <Trash size={20} color="currentColor"/>Delete
                    </button>
                    </div>
                ))}
            </div>
        </section>
    )
}