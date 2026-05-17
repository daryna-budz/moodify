"use client"

import { Sparkles } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react"



export default function Navbar(){
    const { data: session } = useSession()

    return (
        <header className="px-8 py-10 md:px-10">
          <nav className="flex items-center justify-between cursor-pointer">
            <div onClick={() => window.location.reload() } className="flex items-center gap-3">
                  <Sparkles size={40} color="#1d293d"/>
                  <h1 className="text-2xl md:text-4xl font-bold text-slate-800">Moodify</h1>
            </div>
            <div>
              {!session ? (
                <button onClick={() => signIn("spotify", {callbackUrl: "/", show_dialog: "true" })} className="text-xl md:text-2xl font-semibold border-3 text-slate-800 rounded-4xl p-3 cursor-pointer hover:text-white hover:bg-slate-800 transition-all duration-300">Connect Spotify</button>
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