import type { Artist } from "@/app/types"
import type { Track } from "@/app/types"
import type { PlaylistPanelProps } from "@/app/types"



export default function PlaylistPanel({ tracks }: PlaylistPanelProps) {
  return (
    <main className="flex-1">
      <section className="max-w-5xl mx-auto px-6 py-16">
        {tracks.length > 0 ? (
          <>
            <div className="mb-14 flex flex-col items-center text-center w-full">

              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl">
                Your playlist is ready 🎉
              </h2>

              <p className="text-slate-500 mt-3 text-lg max-w-xl">
                Press play and enjoy the vibe!
              </p>
            </div>

            <div className="space-y-6">
              {tracks.map((track, index) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-6">

                      <div className="flex items-center gap-5 flex-1 w-full">
                        <span className="text-sm font-medium text-slate-400 w-8">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <img
                          src={track.album.images?.[0]?.url}
                          alt={track.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition">
                            {track.name}
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            {track.artists.map((a) => a.name).join(", ")}
                          </p>
                        </div>
                      </div>

                      <iframe
                        src={`https://open.spotify.com/embed/track/${track.id}`}
                        width="320"
                        height="80"
                        allow="autoplay; clipboard-write; encrypted-media"
                        className="rounded-2xl"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Create your own playlist!
            </h2>

            <p className="text-slate-500 mt-3 text-lg">
              Choose your mood and generate something special
            </p>
          </div>
        )}
      </section>
    </main>
  );
}