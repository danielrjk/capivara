const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aulaSchema = new Schema({
    data: {
        type: String, 
        required: true
    },
    alunos_presentes: {
        type: [String],
        required: true
    }
}, { timestamps: true })

const turmaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    alunos: {
        type: [String],
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    dias: {
        type: [String],
        required: true
    },
    aulas: {
        type: [aulaSchema],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Turma', turmaSchema)