const Aluno = require('../models/alunoModel')
const mongoose = require('mongoose')
const { writeFile, readFile } = require("fs")
const { error } = require('console')




// criar aluno
const criarAluno = async (req, res) => {
    const { nome, matricula, tag_id } = req.body

    let emptyFields = []

    if (!nome) {
        emptyFields.push('nome')
    }
    if (!matricula) {
        emptyFields.push('matricula')
    }
    if (!tag_id) {
        emptyFields.push('tag_id')
    }
    if (emptyFields.lenght > 0) {
        return res.status(400).json({ error: 'Preencha todos os campos', emptyFields })
    }

    try {
        const aluno = await Aluno.create({ nome, matricula, tag_id })
        res.status(200).json(aluno)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}




module.exports = {
    criarAluno
}