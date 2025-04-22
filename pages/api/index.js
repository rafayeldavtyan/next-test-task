import data from "../../api_preview.json";

/**
 * @swagger
 * /api/:
 *   get:
 *     description: Returns a paginated set of photos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to fetch (1-based)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items to fetch per page
 *     responses:
 *       200:
 *         description: A list of photos for the requested page and limit
 */
export default function handler(req, res) {
  const { page = 1, limit = 20 } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  if (isNaN(limitNum) || limitNum < 1) {
    return res.status(400).json({ error: "Invalid limit number" });
  }

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedData = data.slice(startIndex, endIndex);

  res.status(200).json(paginatedData);
}
