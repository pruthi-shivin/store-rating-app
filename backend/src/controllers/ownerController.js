import db from "../config/db.js";

export const getOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  const storeQuery = `
    SELECT id, name
    FROM stores
    WHERE owner_id = ?
  `;

  db.query(storeQuery, [ownerId], (err, storeResult) => {
    if (err) return res.status(500).json({ error: err.message });

    if (storeResult.length === 0) {
      return res.status(404).json({
        message: "No store found for this owner",
      });
    }

    const store = storeResult[0];

    const dashboardQuery = `
      SELECT 
        u.id,
        u.name,
        u.email,
        r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
    `;

    db.query(dashboardQuery, [store.id], (err, ratingsResult) => {
      if (err) return res.status(500).json({ error: err.message });

      const avgQuery = `
        SELECT ROUND(AVG(rating),1) AS averageRating
        FROM ratings
        WHERE store_id = ?
      `;

      db.query(avgQuery, [store.id], (err, avgResult) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          storeName: store.name,
          averageRating: avgResult[0].averageRating,
          usersWhoRated: ratingsResult,
        });
      });
    });
  });
};