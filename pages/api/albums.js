import previewJson from "../../api_preview.json";

/**
 * @swagger
 * /api/albums:
 *   get:
 *     description: Returns a list of unique album IDs
 *     responses:
 *       200:
 *         description: List of album IDs
 */
export default function handler(req, res) {
    const uniqueAlbumIds = [...new Set(previewJson.map(item => item.albumId))];
    uniqueAlbumIds.sort((a, b) => a - b);
    res.status(200).json(uniqueAlbumIds);
}
