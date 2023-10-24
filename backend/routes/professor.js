const express = require("express")

const {
    recebeProfessores,
    recebeProfessor,
    criaProfessor,
    deletaProfessor,
    editaProfessor,
} = require("../controllers/professorController")

const router = express.Router()

// GET -> recebe todos professores
router.get("/", recebeProfessores)

// GET -> recebe um professor por id
router.get("/:id", recebeProfessor)

// POST -> cria um professor
router.post("/", criaProfessor)

// DELETE -> deleta um profesor por id
router.delete("/:id", deletaProfessor)

// PATCH -> edita um professor por id
router.patch("/:id", editaProfessor)

// POST -> realiza login no sistema
//TODO router.post("/login", loginSistema)

// POST -> realiza logout no sistema
//TODO router.post("/logout", logoutSistema)


module.exports = router
