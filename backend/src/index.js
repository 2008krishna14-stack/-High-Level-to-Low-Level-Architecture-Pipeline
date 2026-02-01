import express from "express";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";
import connectDB from "./config/Database.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/business", aiRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
