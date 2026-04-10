import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email format",
    });
    }

    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({
        message: "Name must be between 20 and 60 characters",
      });
    }

    if (address.length > 400) {
      return res.status(400).json({
        message: "Address too long",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 chars, include uppercase and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, address, role)
      VALUES (?, ?, ?, ?, 'user')
    `;

    db.query(
      query,
      [name, email, hashedPassword, address],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              message: "Email already exists",
            });
          }

          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      }
    );
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: error.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;

    db.query(query, [email], async (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const query = "SELECT * FROM users WHERE id = ?";

    db.query(query, [userId], async (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const user = result[0];

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
        });
      }

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message: "Password format invalid",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery = `
        UPDATE users SET password = ? WHERE id = ?
      `;

      db.query(updateQuery, [hashedPassword, userId], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Password updated successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};