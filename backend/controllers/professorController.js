const Professor = require("../models/professorModel")
const mongoose = require("mongoose")

// receber todos professores
const recebeProfessores = async (req, res) => {
    const professores = await Professor.find({}).sort({ nome: 1 })

    res.status(200).json(professores)
}

// receber um professor
const recebeProfessor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const professor = await Professor.findById(id)

    if (!aluno) {
        return res.status(404).json({ error: "Professor não encontrado" })
    }

    res.status(200).json(professor)
}

// criar professor
const criaProfessor = async (req, res) => {
    const { nome, matricula, email, senha } = req.body

    let emptyFields = []

    if (!nome) {
        emptyFields.push(nome)
    }
    if (!matricula) {
        emptyFields.push(matricula)
    }
    if (!email) {
        emptyFields.push(email)
    }
    if (!senha) {
        emptyFields.push(senha)
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Preencha todos os campos", emptyFields })
    }

    try {
        const professor = await Professor.create({
            nome,
            matricula,
            email,
            senha,
        })
        res.status(200).json(professor)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// editar professor
const editaProfessor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const professor = await Professor.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    )

    if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
    }

    res.status(200).json(professor)
}

// deletar um professor
const deletaProfessor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const professor = await Professor.findOneAndDelete({ _id: id })

    if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado" })
    }

    res.status(200).json(professor)
}

// TODO: login no sistema

// TODO: logout no sistema

module.exports = {
    recebeProfessores,
    recebeProfessor,
    criaProfessor,
    deletaProfessor,
    editaProfessor,
}
