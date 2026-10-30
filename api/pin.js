const HOST = "pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export default async function handler(req, res) {
  const pinUrl = String(req.query.url || "").trim();

  if (!pinUrl) {
    return res.status(400).json({ error: "A pin URL is required." });
  }

  if (!/^https?:\/\/(www\.)?(pinterest\.[a-z.]+|pin\.it)\//i.test(pinUrl)) {
    return res.status(400).json({ error: "That does not look like a Pinterest link." });
  }

  if (!RAPIDAPI_KEY) {
    console.error("RAPIDAPI_KEY is not configured");
    return res.status(500).json({ error: "Service is not configured." });
  }

  try {
    const response = await fetch(`https://${HOST}/pins?url=${encodeURIComponent(pinUrl)}`, {
      headers: {
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`upstream returned ${response.status}`);
    }

    return res.status(200).json(await response.json());
  } catch (error) {
    console.error("pin lookup:", error.message);
    return res.status(502).json({ error: "Could not resolve that pin." });
  }
}
