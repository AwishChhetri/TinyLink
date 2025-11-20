import { pool } from "../db.js";

export const LinkModel = {
  findAll: async () => pool.query("SELECT * FROM links ORDER BY created_at DESC"),

  findByCode: async (code) =>
    pool.query("SELECT * FROM links WHERE code=$1", [code]),

  create: async (code, url) =>
    pool.query("INSERT INTO links (code, url) VALUES ($1, $2)", [code, url]),

  delete: async (code) =>
    pool.query("DELETE FROM links WHERE code=$1", [code]),

  incrementClicks: async (code) =>
    pool.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1",
      [code]
    )
};
