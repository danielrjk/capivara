const express = require("express")
const {
    recebeTurma,
    recebeTurmas,
    recebeTurmasProfessor,
    criaTurma,
    editaTurma,
    deletaTurma,
} = require("../controllers/turmaController")

const router = express.Router()

// GET -> recebe todas as turmas
router.get("/", recebeTurmas)

// GET -> recebe uma turma com id
router.get("/:id", recebeTurma)

// GET -> recebe todas turmas de um professor
router.get("/professor/:id", recebeTurmasProfessor)

// POST -> cria uma turma
router.post("/", criaTurma)

// PATCH -> edita uma turma
router.patch("/:id", editaTurma)

// DELETE -> deleta uma turma
router.delete("/:id", deletaTurma)

module.exports = router