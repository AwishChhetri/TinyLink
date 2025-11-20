import { pool } from "../db.js"; 

export const HealthController = {
  check: async (req, res) => {
    const health = {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: "Neon"
    };

    try {
      await pool.query("SELECT 1"); 
      health.database = "connected";
    } catch (err) {
      health.status = "error";
      health.database = "disconnected";
    }

    res.status(200).json(health);
  }
};
