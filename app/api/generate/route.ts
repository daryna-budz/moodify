
type Mood = "happy" | "calm" | "pumped" | "focused" | "melancholic" | "party"
type Activity = "yoga" | "work" | "sleep" | "workout" | "driving"

async function getTracksFromGemini(mood: Mood, activity: Activity, energy: number |number[]) {
  const energyValue = Array.isArray(energy) ? energy[0] : energy;
  const prompt = `You are a music expert. Suggest 10 real, popular songs for someone who feels ${mood}, 
  is doing ${activity}, with energy level ${energyValue} out of 10.

  Rules:
  - Only real songs that exist on Spotify
  - Prefer recent songs from 2022-2025
  - Match the energy level (1-3 = very chill, 4-6 = medium, 7-10 = high energy)
  - Be diverse with artists, no more than 2 songs per artist
  - Return ONLY a JSON array, no explanation, no markdown, no backticks

  Format:
  [{"artist": "Artist Name", "title": "Song Title"}, ...]`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

  const response = await fetch(url,
    {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" ,
        "x-goog-api-key": process.env.GEMINI_API_KEY!
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.8, 
        } 
      })
    }
  )

  console.log("Gemini status:", response.status)
  const raw = await response.text()
  console.log("Gemini raw:", raw)

  const data = raw ? JSON.parse(raw) : {}

  if (!response.ok) {
    console.error("Gemini Error Details:", data.error);
    return [];
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]"

  try {
    const clean = text.replace(/```json|```/g, "").trim()
    return JSON.parse(clean) as { artist: string; title: string }[]
  } catch {
    console.error("Gemini parse error:", text)
    return []
  }
}

async function searchTrackOnSpotify(
  artist: string,
  title: string,
  token: string
): Promise<any | null> {
  const query = `artist:"${artist}" track:"${title}"`
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1&market=US`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const data = await response.json()
  return data.tracks?.items?.[0] ?? null
}

export async function POST(req: Request) {
  const { mood, activity, energy } = await req.json()
  console.log("Input:", { mood, activity, energy })

  const [token, geminiTracks] = await Promise.all([
    getAccessToken(),
    getTracksFromGemini(mood, activity, energy)
  ])

  console.log("Token:", token ? "OK" : "FAILED")
  console.log("Gemini tracks:", geminiTracks)

  if (geminiTracks.length === 0) {
    return Response.json({ error: "Failed to generate tracks" }, { status: 500 })
  }

  
  const results = await Promise.all(
    geminiTracks.map(({ artist, title }) =>
      searchTrackOnSpotify(artist, title, token)
    )
  )

  console.log("Spotify results:", results.filter(Boolean).length, "found")
  const tracks = results.filter(Boolean)

  return Response.json({ tracks })
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  })

  const data = await response.json()
  return data.access_token
}
  