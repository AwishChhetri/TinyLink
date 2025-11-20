import { LinkModel } from "../models/linkModel.js";

export const LinksController = {

  create: async (req, res) => {
    console.log("This is the create:",req.body)
    const { url, code } = req.body;

    // Validate URL
    try { new URL(url); }
    catch {
      return res.status(400).json({
        status: "invalid",
        message: "Invalid URL"
      });
    }

    const finalCode = code || Math.random().toString(36).substring(2, 8);

    // Duplicate code
    const exists = await LinkModel.findByCode(finalCode);
    if (exists.rowCount > 0) {
      return res.status(409).json({
        status: "exists",
        message: "Custom code already exists"
      });
    }

    // Create
    await LinkModel.create(finalCode, url);

    return res.status(201).json({
      status: "created",
      message: "Short link created",
      code: finalCode,
      url
    });
  },

  list: async (req, res) => {
    const data = await LinkModel.findAll();
    res.render("index", { links: data.rows });
  },

  stats: async (req, res) => {
    const { code } = req.params;
    const data = await LinkModel.findByCode(code);

    if (!data.rowCount) {
      return res.status(404).json({
        status: "404",
        message: "Link not found"
      });
    }

    res.render("stats", { link: data.rows[0] });
  },

  remove: async (req, res) => {
    console.log("This is the delted api!")
    const deleted = await LinkModel.delete(req.params.code);
    console.log(deleted)
    if (!deleted.rowCount) {
      return res.status(404).json({
        status: "not_found",
        message: "Link not found"
      });
    }

    return res.status(200).json({
      status: "deleted",
      message: "Link deleted successfully"
    });
  }
};
