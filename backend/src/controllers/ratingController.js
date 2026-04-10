import db from "../config/db.js";

export const submitRating = (req, res) => {
  const user_id = req.user.id;
  const { store_id, rating } = req.body;

  if (!store_id || !rating) {
    return res.status(400).json({ message: "Missing data" });
  }

  const query = `
    INSERT INTO ratings (user_id, store_id, rating)
    VALUES (?, ?, ?)
  `;

  db.query(query, [user_id, store_id, rating], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "already rated",
        });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: "Rating submitted" });
  });
};

export const updateRating = (req, res) => {
  const user_id = req.user.id;
  const { store_id, rating } = req.body;

  const query = `
    UPDATE ratings
    SET rating = ?
    WHERE user_id = ? AND store_id = ?
  `;

  db.query(query, [rating, user_id, store_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Rating updated" });
  });
};