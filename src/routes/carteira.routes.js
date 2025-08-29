import express from "express";
import { atualizarCarteira } from "../controller/carteira.controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dados = await atualizarCarteira();
    res.json(dados);
  } catch (error) {
    console.error("❌ Erro na rota /carteira:", error);
    res.status(500).json({ error: "Erro ao atualizar carteira" });
  }
});

export default router;
