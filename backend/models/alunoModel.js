const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alunoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    tag_id: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Aluno', alunoSchema)