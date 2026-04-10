import db from "../config/db.js";

export const getAllStores = (req, res) => {
  const userId = req.user.id;
  const { search = "" } = req.query;

  let query = `
    SELECT 
    s.id,
    s.name,
    s.address,
    ROUND(AVG(r.rating), 1) AS overallRating,

    ur.rating AS userRating,
    ur.id AS userRatingId

    FROM stores s

    LEFT JOIN ratings r 
    ON s.id = r.store_id

    LEFT JOIN ratings ur 
    ON s.id = ur.store_id AND ur.user_id = ?

    GROUP BY s.id
    `;

  const values = [userId];

  if (search) {
    query += `
      WHERE s.name LIKE ? OR s.address LIKE ?
    `;
    values.push(`%${search}%`, `%${search}%`);
  }

  query += " GROUP BY s.id";

  db.query(query, [userId], (err, result) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }

  res.json(result);
}
);}