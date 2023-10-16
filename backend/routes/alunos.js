const express = require('express')
const {
    criarAluno,
} = require('../controllers/alunoController')

const router = express.Router()

// POST -> criar aluno
router.post('/criar-aluno/', criarAluno)


module.exports = router 