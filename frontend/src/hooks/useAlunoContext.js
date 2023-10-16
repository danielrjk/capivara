import { AlunoContext } from "../context/AlunoContext"
import { useContext } from "react"

export const useAlunoContext = () => {
    const context = useContext(AlunoContext)

    if (!context) {
        throw Error('useAlunoContext must be used inside an AlunoContextProvider')
    }

    return context
}