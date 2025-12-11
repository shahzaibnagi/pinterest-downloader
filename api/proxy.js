export default async function handler(req, res) {
    const pinUrl = req.query.url;

    if (!pinUrl) {
        return res.status(400).json({ error: "URL required" });
    }

    const apiUrl = `https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/pins?url=${encodeURIComponent(pinUrl)}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com",
                "x-rapidapi-key": "REDACTED_ROTATE_ME"
            }
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({ error: "Server Error" });
    }
}
