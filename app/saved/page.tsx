"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Playlist } from '../types';
import { Trash, ChevronDown } from 'lucide-react';



export default function SavedPlaylists(){
    const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([])
    const [expandedPlaylist, setExpandedPlaylist] = useState<Set<number>>(new Set());

    function deletePlaylist(id: number){
        const newPlaylist = savedPlaylists.filter(
            (playlist) => playlist.id !==id
        )
        setSavedPlaylists(newPlaylist)
        localStorage.setItem("playlists", JSON.stringify(newPlaylist))
    }

    function showTracks(id: number){
        setExpandedPlaylist(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        })
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
                {savedPlaylists.map((playlist) => {

                  const isExpanded = expandedPlaylist.has(playlist.id);
                  const visibleTracks = isExpanded ? playlist.tracks : playlist.tracks.slice(0, 3);
                  return (
                    <div key={playlist.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                       <div className='px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3'>
                            <div>
                                <div className='flex items-center gap-2 mb-2'>
                                   <span className="text-xs font-medium px-2 py-1 border-2 rounded-full bg-slate-100 text-slate-600">{playlist.mood}</span>
                                   <span className="text-xs font-medium px-2 py-1 border-2 rounded-full bg-slate-100 text-slate-600">{playlist.activity}</span>
                                </div>
                                <p className="text-sm text-slate-400 "> {playlist.tracks.length} tracks </p>
                            </div>
                            <button onClick={() => deletePlaylist(playlist.id)} className="flex items-center gap-1.5 text-sm text-slate-500 px-3 py-2 rounded-lg border border-slate-200 hover:border-red-200 hover:text-red-500 transition-colors cursor-pointer">
                            <Trash size={20} color="currentColor"/>Delete
                            </button>
                        </div>


                        {visibleTracks.map((track, index) => (
                           <div key={index} className='flex flex-col md:flex-row items-start md:items-center gap-3 px-6 py-3 border-b border-slate-100 last:border-0'>
                            
                            <span className="text-xs text-slate-400 w-5 text-right shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <img
                                src={track.album.images?.[0]?.url}
                                alt={track.name}
                                className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900">{track.name}</p>
                                <p className="text-xs text-slate-500">{track.artists.map((a) => a.name).join(", ")} </p>
                            </div>
                            <iframe
                                    src={`https://open.spotify.com/embed/track/${track.id}`}
                                    height="80"
                                    allow="autoplay; clipboard-write; encrypted-media"
                                    className="rounded-2xl shrink-0"
                            />
                        </div>
                        ))}
                        {playlist.tracks.length > 3 && (
                                <div className="px-6 py-3 border-t border-slate-100 flex justify-end">
                                <button onClick={()=>showTracks(playlist.id)} className="text-sm text-slate-400 flex items-center gap-1 hover:text-slate-600 cursor-pointer">
                                   {isExpanded ? "Show less" : `Show all ${playlist.tracks.length} tracks`}
                                   <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                </button>
                                </div>
                        )}
                    </div>
                    )
                })}
            </div>
        </section>
    )
}