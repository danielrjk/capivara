const Aluno = require("../models/alunoModel")
const mongoose = require("mongoose")

// receber todos alunos
const recebeAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find({}).sort({ nome: 1 })

        return res.status(200).json(alunos)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// receber um aluno
const recebeAluno = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const aluno = await Aluno.findById(id)

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" })
        }

        return res.status(200).json(aluno)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// criar aluno
const criarAluno = async (req, res) => {
    const { nome, matricula, tag_id } = req.body

    let emptyFields = []

    try {
        if (!nome) {
            emptyFields.push("nome")
        }
        if (!matricula) {
            emptyFields.push("matricula")
        }
        if (!tag_id) {
            emptyFields.push("tag_id")
        }
        if (emptyFields.lenght > 0) {
            return res
                .status(400)
                .json({ error: "Preencha todos os campos", emptyFields })
        }
        const aluno = await Aluno.create({ nome, matricula, tag_id })

        return res.status(200).json(aluno)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// editar aluno
const editarAluno = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const aluno = await Aluno.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            }
        )

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" })
        }

        return res.status(200).json(aluno)
    } catch (err) {
        return res.stauts(500).json({ error: err.message })
    }
}

// deletar aluno
const deletarAluno = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.statusstatus(400).json({ error: "ID inválido" })
        }

        const aluno = await Aluno.findOneAndDelete({ _id: id })

        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" })
        }

        res.status(200).json(aluno)
    } catch (err) {
        return res.status(500).json({ error: err.mesage })
    }
}

module.exports = {
    recebeAlunos,
    recebeAluno,
    criarAluno,
    editarAluno,
    deletarAluno,
}
