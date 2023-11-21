const express = require("express")
const {
    leCarteirinha,
    lerFila,
    limparFila,
} = require("../controllers/leitorController")

const router = express.Router()

// POST -> ler a carteirinha
router.post("/", leCarteirinha)

// GET -> receber a fila
router.get("/", lerFila)

// DELETE -> limpar a fila
router.delete("/:classroom_id", limparFila)

module.exports = router
