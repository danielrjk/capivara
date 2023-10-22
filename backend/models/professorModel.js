const mongoose = require("mongoose")
const Schema = mongoose.Schema

const professorSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        matricula: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        senha: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Professor", professorSchema)
