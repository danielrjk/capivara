//import { useAlunoContext } from "../hooks/useAlunoContext"

const AlunoDetails = ({ aluno }) => {
    return (
        <div className="mostraAluno">
            <p className="nome">{aluno.nome}</p>
            <p className="matricula">{aluno.matricula}</p>
        </div>
    )
}

export default AlunoDetails