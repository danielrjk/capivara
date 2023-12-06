const Aluno = require("../models/alunoModel")
const Turma = require("../models/turmaModel")
const mongoose = require("mongoose")
const { readFile, readFileSync, writeFileSync } = require("fs")

/* 
! DESCONTINUADO
const leCarteirinhav1 = async (req, res) => {
    const { tag_id, device_id } = req.body

    try {
        const alunoResultado = await Aluno.find({ tag_id: tag_id })

        if (alunoResultado.length > 0) {
            //console.log("Aluno encontrado:", alunoResultado)

            const turmas = alunoResultado.turmas
            if (!turmas.includes(turmaAtual)) {
                alunoResultado.turmas.push(turmaAtual)
            }

            // TODO - marcar presenca
        } else {
            //console.log("Aluno nao encontrado")

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

            res.status(200).json({ msg: "Aluno enviado para fila" })
        }
    } catch (err) {
        //console.error("Ocorreu um erro:", err)
        return res.status(500).json(err)
    }
}
*/

// mandar hash da carteirinha pro sistema
const leCarteirinha = async (req, res) => {
    const { tag_id, classroom_id } = req.body

    try {
        const data_atual_objeto = new Date()

        const data_string = data_atual_objeto.toLocaleDateString()
        const dia_semana = data_atual_objeto.getDay()
        const hora = data_atual_objeto.getHours()

        const alunoResultado = await Aluno.findOne({ tag_id: tag_id })

        const aulaAtual = await Turma.findOne({
            sala: classroom_id,
            dias: { $in: dia_semana },
            inicio: { $lte: hora },
            termino: { $gt: hora },
        })

        if (alunoResultado) {
            if (!aulaAtual.aulas.hasOwnProperty(data_string)) {
                aulaAtual.aulas[data_string] = []
            }
            aulaAtual.aulas[data_string].push(alunoResultado.matricula)

            if (!aulaAtual.alunos.includes(alunoResultado.matricula)) {
                aulaAtual.alunos.push(alunoResultado.matricula)
            }

            aulaAtual.save()
            
            return res.status(200).json({ nome: alunoResultado.nome.split(" ")[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "") })
        } else {
            const filaAlunos = readFileSync("./src/filaAlunos.json")
            const filaAlunosParse = JSON.parse(filaAlunos)
            filaAlunosParse[classroom_id].push(tag_id)
            writeFileSync(
                "./src/filaAlunos.json",
                JSON.stringify(filaAlunosParse, null, 2)
            )
            return res.status(200).json({msg: "Aluno enviado a fila"})
        }

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

/* 
! ALUNO LIDO PARA A FILA - descontinuado
const leCarteirinha = async (req, res) => {
    const { tag_id } = req.body

    try {
        const alunoResultado = await Aluno.find({ tag_id: tag_id })
        
        if (alunoResultado.length > 0) {
            //console.log("Aluno encontrado:", alunoResultado)

            readFile("./src/filaAlunos.json", (error, data) => {
                if (error) {
                    return res.status(500).json(error)
                }

                const parsedData = JSON.parse(data)

                if (!parsedData.fila) {
                    parsedData.fila = []
                }

                parsedData.fila.unshift(alunoResultado[0])

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
        }
        
        return res.status(200).json({msg: "Aluno enviado para a fila."})

    } catch (err) {
        //console.error("Ocorreu um erro: ", err)
        return res.status(500).json(err)
    }
}
*/

// ler a fila
const lerFila = async (req, res) => {
    const { classroom_id } = req.params
    try {
        await readFile("./src/filaAlunos.json", (error, data) => {
            if (error) {
                //console.error(error)
                return res.status(500).json({ error: "Erro ao ler a fila" })
            }

            const parsedData = JSON.parse(data)[classroom_id]

            if (parsedData.fila && parsedData.fila.length > 0) {
                return res.status(200).json(parsedData.fila)
            }

            return res.status(404).json({ error: "Nenhum objeto encontrado." })
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// limpar fila alunos
const limparFila = async (req, res) => {
    const { classroom_id } = req.params
    try {
        const filaAlunos = readFileSync("./src/filaAlunos.json")
        const filaAlunosParse = JSON.parse(filaAlunos)
        filaAlunosParse[classroom_id] = []
        writeFileSync(
            "./src/filaAlunos.json",
            JSON.stringify(filaAlunosParse, null, 2)
        )

        res.status(200).json({ msg: "Fila liberada" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    leCarteirinha,
    lerFila,
    limparFila,
}
