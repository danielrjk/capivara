const Aluno = require("../models/alunoModel")
const mongoose = require("mongoose")
const { writeFile, readFile } = require("fs")

// mandar hash da carteirinha pro sistema
const leCarteirinha = async (req, res) => {
    const { tag_id } = req.body

    try {
        const alunoResultado = await Aluno.find({ tag_id: tag_id })

        if (alunoResultado.length > 0) {
            console.log("Aluno encontrado:", alunoResultado)

            const turmas = alunoResultado.turmas
            if (!turmas.includes(turmaAtual)) {
                //TODO patch edita aluno
            }
            
            

        } else {
            console.log("Aluno nao encontrado")
            
            //! enviar para fila de criacao
            readFile("./src/filaAlunos.json", (error, data) => {
                if (error) {
                    return res.status(500).json(error)
                }

                const parsedData = json.parse(data)

                if (!parsedData.fila) {
                    parsedData.fila = []
                }

                parsedData.fila.push(tag_id)

                writeFile(
                    "./src/filaAlunos.json",
                    JSON.stringify(parsedData, null, 2),
                    (err) => {
                        if (err) {
                            return res.status(500).json(err)
                        }
                    }
                )
            })

            res.status(200).json({msg: "Aluno enviado para fila"})
        }
    } catch (err) {
        console.error("Ocorreu um erro:", err)
        return res.status(500).json(err)
    }
}

// ler a fila
const lerFila = async (req, res) => {
    try {
        await readFile("./src/filaAlunos.json", (error, data) => {
            if (error) {
                console.error(error)
                return res.status(500).json({ error: "Erro ao ler a fila" })
            }

            const parsedData = JSON.parse(data)

            if (parsedData.fila && parsedData.fila.length > 0) {
                return res.status(200).json(parsedData.fila)
            }
            return res.status(404).json({ error: "Nenhum objeto encontrado." })
        })
    } catch (err) {
        res.status(400)
    }
}

// limpar fila alunos
const limparFila = async (req, res) => {
    try {
        readFile("./src/filaAlunos.json", (error, data) => {
            if (error) {
                console.error(error)
                return
            }

            const parsedData = JSON.parse(data)
            parsedData.fila = []

            writeFile(
                "./src/filaAlunos.json",
                JSON.stringify(parsedData, null, 2),
                (err) => {
                    if (err) {
                        return res.status(500).json(err)
                    }
                }
            )

            res.status(200).json({ msg: "Fila liberada" })
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    leCarteirinha,
    lerFila,
    limparFila,
}
