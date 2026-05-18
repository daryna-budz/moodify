"use client"

import { Sparkles, Menu, X } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"



export default function Navbar(){
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    function showMenu() {
      setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="px-8 py-10 md:px-10">
          <nav className="flex items-center justify-between cursor-pointer">
            <div onClick={() => window.location.reload() } className="flex items-center gap-3">
                  <Sparkles size={40} color="#1d293d"/>
                  <h1 className="text-2xl md:text-4xl font-bold text-slate-800">Moodify</h1>
            </div>
            <div>
              {!session ? (
                <>
                    <div className='md:hidden'>
                      {isMenuOpen ? (
                        <X size={45} color="#1d293d" className='cursor-pointer' onClick={showMenu}/>
                      ) : (
                        <Menu size={45} color="#1d293d" className='cursor-pointer' onClick={showMenu}/>
                      )}
                    </div>
                    <div className='hidden md:flex items-center gap-10'>
                       <div className='md:text-xl font-semibold text-slate-800 cursor-pointer'>Saved Playlists</div>
                       <button onClick={() => signIn("spotify", {callbackUrl: "/", show_dialog: "true" })} className="text-lg md:text-2xl font-semibold border-3 text-slate-800 rounded-4xl p-2 md:p-3 cursor-pointer hover:text-white hover:bg-slate-800 transition-all duration-300">Connect Spotify</button>
                    </div>

                    {isMenuOpen && (
                        <div className="absolute text-center top-24 right-8 bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4 md:hidden ">
                          <div className="font-semibold text-slate-800 cursor-pointer">
                            Saved Playlists
                          </div>

                          <button
                            onClick={() =>
                              signIn("spotify", {
                                callbackUrl: "/",
                                authorizationParams: {
                                  show_dialog: "true",
                                },
                              })
                            }
                            className="text-lg md:text-2xl font-semibold border-3 text-slate-800 rounded-4xl p-2 md:p-3 cursor-pointer hover:text-white hover:bg-slate-800 transition-all duration-300"
                          >
                            Connect Spotify
                          </button>
                        </div>
                      )}
                </>
              ) : (
                <div className="flex items-center gap-4">
            
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="font-semibold">{session.user?.name}</span>
                  <button onClick={() => signOut()}> Logout </button>
                </div>
              )}
            </div>
          </nav>
        </header>
      );
}