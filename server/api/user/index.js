import connectDB from "../../utils/connectDB";
import User from "../../models/userModel";
import { tokenProtect, isAdmin } from "../../middlewares/auth";

connectDB();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let users = await User.find({});

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      try {
        await tokenProtect(req, res);
        await isAdmin(req, res);

        const users = await User.create(req.body);
        res.status(201).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
