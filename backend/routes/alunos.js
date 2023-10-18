const express = require('express')
const {
    recebeAlunos,
    recebeAluno,
    criarAluno,
    editarAluno,
    deletarAluno
} = require('../controllers/alunoController')

const router = express.Router()

// GET -> recebe todos alunos
router.get('/', recebeAlunos)

// GET -> recebe um aluno por id
router.get('/:id', recebeAluno)

// POST -> criar aluno
router.post('/', criarAluno)

// DELETE -> deleta um aluno por id
router.delete('/:id', deletarAluno)

// PATCH -> editar um aluno por id
router.patch('/:id', editarAluno)



module.exports = router 