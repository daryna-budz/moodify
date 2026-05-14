

export type Mood = "happy" | "calm" | "pumped" | "focused" | "melancholic" | "party"
export type Activity = "yoga" | "work" | "sleep" | "workout" | "driving"



export type SidebarProps = {
    setTracks: React.Dispatch<React.SetStateAction<any[]>>
}

export type Artist = {
    name: string
  }
  

export type Track = {
    id: string
    name: string
    artists: Artist[]
    external_urls: {
      spotify: string
    }
    album: {
      images: { url: string }[]
    }
}
  
export type PlaylistPanelProps = {
    tracks: Track[]
}

