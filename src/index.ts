import express from "express";
import { config } from "dotenv";
import urlRoutes from "./routes/url.routes";
import redirectRoutes from "./routes/redirect.routes";

config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/url", urlRoutes);
app.use("/", redirectRoutes);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
