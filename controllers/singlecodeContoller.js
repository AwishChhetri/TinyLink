import { LinkModel } from "../models/linkModel.js";


export const singlecodeController={
    stats: async (req, res)=>{
         const { code } = req.params;
            const data = await LinkModel.findByCode(code);
        
            if (!data.rowCount) {
              return res.status(404).json({
                status: "404",
                message: "Link not found"
              });
            }
        
            res.render("stats", { link: data.rows[0] });
    }
}