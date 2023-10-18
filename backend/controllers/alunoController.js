const Aluno = require('../models/alunoModel')
const mongoose = require('mongoose')
const { writeFile, readFile } = require("fs")

// receber todos alunos
const recebeAlunos = async (req, res) => {
    const alunos = await Aluno.find({}).sort({ nome: 1 })

    res.status(200).json(alunos)
}

// receber um aluno
const recebeAluno = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    const aluno = await Aluno.findById(id)

    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    res.status(200).json(aluno)
}

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

// editar aluno
const editarAluno = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    const aluno = await Aluno.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    res.status(200).json(aluno)
}

// deletar aluno
const deletarAluno = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    const aluno = await Aluno.findOneAndDelete({ _id: id })

    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    res.status(200).json(aluno)
}


module.exports = {
    recebeAlunos,
    recebeAluno,
    criarAluno,
    editarAluno,
    deletarAluno
}