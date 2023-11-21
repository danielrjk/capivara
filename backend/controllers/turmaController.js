const Turma = require("../models/turmaModel")
const Professor = require("../models/professorModel")
const mongoose = require("mongoose")
const { writeFile, readFile, readFileSync, writeFileSync } = require("fs")

// receber todas turmas
const recebeTurmas = async (req, res) => {
    try {
        const turmas = await Turma.find({})

        return res.status(200).json(turmas)
    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json({ error: err.message })
    }
}

// receber todas turmas de um professor
const recebeTurmasProfessor = async (req, res) => {
    const { id } = req.params

    try {
        const turmas = await Turma.find({ professor: id }).sort({
            codigo: 1,
            turma: 1,
        })

        return res.status(200).json(turmas)
    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json({ error: err.message })
    }
}

// receber uma turma
const recebeTurma = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const turma = await Turma.findById(id)

        if (!turma) {
            return res.status(404).json({ error: "Turma não encontrada" })
        }

        return res.status(200).json(turma)
    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json({ error: err.message })
    }
}

// criar turma
const criaTurma = async (req, res) => {
    const { nome, codigo, turma, sala, professor, inicio, termino, dias } =
        req.body

    let emptyFields = []
    let fields = [nome, codigo, turma, sala, professor, inicio, termino, dias]

    for (let i = 0; i < fields.length; i++) {
        const element = fields[i]
        if (element == null) {
            emptyFields.push(element)
        }
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Preencha todos os campos", emptyFields })
    }

    try {
        const turmaCriada = await Turma.create({
            nome,
            codigo,
            turma,
            sala,
            professor,
            inicio,
            termino,
            dias
        })

        //console.log("turma criada: ", turmaCriada)

        await Professor.updateOne(
            { _id: professor },
            { $push: { turmas: turmaCriada._id } }
        )

        const filaAlunos = readFileSync("./src/filaAlunos.json")

        const filaAlunosParse = JSON.parse(filaAlunos)

        if (!filaAlunosParse.hasOwnProperty(sala)) {
            filaAlunosParse[sala] = []
        }
        
        //console.log(filaAlunosParse)

        writeFileSync("./src/filaAlunos.json", JSON.stringify(filaAlunosParse, null, 2))

        return res.status(200).json(turmaCriada)
    } catch (err) {
        //console.error(err)
        return res.status(500).json({ error: err.message })
    }
}

// editar turma
const editaTurma = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const turma = await Turma.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            }
        )

        if (!turma) {
            return res.status(404).json({ error: "Turma não encontrada" })
        }

        res.status(200).json(turma)
    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json({ error: err.message })
    }
}

// deletar uma turma
const deletaTurma = async (req, res) => {
    const { id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" })
        }

        const turma = await Turma.findOneAndDelete({ _id: id })

        if (!turma) {
            return res.status(404).json({ error: "Turma não encontrada" })
        }

        await Professor.updateOne(
            { _id: turma.professor },
            { $pull: { turmas: turma._id } }
        )

        // TODO deletar turma do aluno

        return res.status(200).json(turma)
    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    recebeTurma,
    recebeTurmas,
    recebeTurmasProfessor,
    criaTurma,
    editaTurma,
    deletaTurma,
}
