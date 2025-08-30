import express from "express";
import cors from "cors";
import carteiraRoutes from "./routes/carteira.routes.js";

const app = express();

app.use(cors({
  origin: "*",      
  methods: "*",     
  allowedHeaders: "*"
}));
app.use("/carteira", carteiraRoutes);

export default app;
