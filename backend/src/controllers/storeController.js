import db from "../config/db.js";

export const getAllStores = (req, res) => {
  const userId = req.user.id;
  const { search = "" } = req.query;

  let query = `
    SELECT 
      s.id,
      s.name,
      s.address,
      ROUND(AVG(r.rating),1) AS avg_rating,
      (
        SELECT rating 
        FROM ratings 
        WHERE user_id = ? AND store_id = s.id
      ) AS user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
  `;

  const values = [userId];

  if (search) {
    query += `
      WHERE s.name LIKE ? OR s.address LIKE ?
    `;
    values.push(`%${search}%`, `%${search}%`);
  }

  query += " GROUP BY s.id";

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};