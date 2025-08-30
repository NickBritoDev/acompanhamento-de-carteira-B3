import express from "express"; 
import app from "./app.js";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5420;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/', express.static(path.join(__dirname, '../../client')));
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  open(`http://localhost:${PORT}/index.html`); 
});
