import React, { useEffect, useState } from "react"
import AlunoDetails from "../components/alunoDetails"


const Home = () => {

    const [aluno, setAluno] = useState(null)


    const ultimoAluno = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/alunos/ultimo-aluno/')
            if (!response.ok) {
                throw new Error("Ocorreu um erro ao ler o ultimo aluno.")
            }
            const alunoData = await response.json()
            setAluno(alunoData)
            //console.log(aluno.nome, aluno.matricula)
        } catch (err) {
            //console.error(err.message)
            setAluno(null)
        }
    }

    useEffect(() => {
        ultimoAluno()

        const intervalo = setInterval(ultimoAluno, 500)

        return () => {
            clearInterval(intervalo)
        }
    }, [])

    return (
        <div className="home">
            <p className="titulo">Aluno:</p>
            {aluno ? <AlunoDetails aluno={aluno} /> : <p className="loading">Carregando...</p>}
        </div>
    )
}

export default Home
