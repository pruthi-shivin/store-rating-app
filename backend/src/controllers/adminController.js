import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, address, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [name, email, hashedPassword, address, role],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
          message: `${role} created successfully`,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStore = (req, res) => {
  try {
    const { name, address, owner_id } = req.body;

    const query = `
      INSERT INTO stores (name, address, owner_id)
      VALUES (?, ?, ?)
    `;

    db.query(query, [name, address, owner_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Store created successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardStats = (req, res) => {
  const queries = {
    users: "SELECT COUNT(*) AS totalUsers FROM users",
    stores: "SELECT COUNT(*) AS totalStores FROM stores",
    ratings: "SELECT COUNT(*) AS totalRatings FROM ratings",
  };

  db.query(queries.users, (err, usersResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(queries.stores, (err, storesResult) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(queries.ratings, (err, ratingsResult) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          totalUsers: usersResult[0].totalUsers,
          totalStores: storesResult[0].totalStores,
          totalRatings: ratingsResult[0].totalRatings,
        });
      });
    });
  });
};

export const getUsersList = (req, res) => {
  const { search = "", role = "" } = req.query;

  let query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      ROUND(AVG(r.rating),1) AS owner_rating
    FROM users u
    LEFT JOIN stores s ON u.id = s.owner_id
    LEFT JOIN ratings r ON s.id = r.store_id
    WHERE (u.name LIKE ? OR u.email LIKE ? OR u.address LIKE ?)
  `;

  const values = [
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
  ];

  if (role) {
    query += " AND u.role = ?";
    values.push(role);
  }

  query += " GROUP BY u.id";

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};

export const getStoresList = (req, res) => {
  const query = `
    SELECT 
      s.id,
      s.name,
      s.address,
      ROUND(AVG(r.rating),1) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(result);
  });
};