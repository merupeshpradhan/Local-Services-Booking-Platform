import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`\n🚀 Server is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
