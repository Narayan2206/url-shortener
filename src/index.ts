import express from "express";
import { config } from "dotenv";
import urlRoutes from "./routes/url.routes";

config();
const PORT = 8000;
const app = express();
app.use(express.json());
app.use("/api/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
