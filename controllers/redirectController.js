import { LinkModel } from "../models/linkModel.js";

export const RedirectController = {
  go: async (req, res) => {
    console.log("This is the code:", req.params)
    const { code } = req.params;
  
    const data = await LinkModel.findByCode(code);
    if (!data.rowCount) {
      return res.status(404).send("Not found");
    }

    await LinkModel.incrementClicks(code);
    return res.redirect(302, data.rows[0].url);
  }
};
