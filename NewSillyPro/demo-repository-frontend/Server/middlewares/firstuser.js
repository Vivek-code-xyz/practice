import User from "../models/User.js";

let adminCreated = false;

export const makeFirstUserAdmin = async (req, res, next) => {
  try {
    if (!adminCreated) {
      const userCount = await User.countDocuments();
      
      if (userCount === 0) {
        req.body.role = "admin";
        adminCreated = true;
        console.log("First user will be created as admin");
      }
    }
    next();
  } catch (error) {
    console.error("First user admin middleware error:", error);
    next();
  }
};