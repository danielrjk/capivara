const mongoose = require("mongoose")
const Schema = mongoose.Schema

const turmaSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        codigo: {
            type: String,
            required: true,
        },
        turma: {
            type: String,
            required: true,
        },
        sala: {
            type: String,
            required: true,
        },
        professor: {
            type: String,
            required: true,
        },
        alunos: {
            type: [String],
            default: [],
            required: false
        },
        inicio: {
            type: Number,
            required: true,
        },
        termino: {
            type: Number,
            required: true,
        },
        dias: {
            type: [Number],
            required: true,
        },
        aulas: {
            type: Object,
            default: {},
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Turma", turmaSchema)
