import { createContext, useReducer } from 'react'

export const AlunoContext = createContext()

export const alunoReducer = (state, action) => {
    switch (action.type) {
        case 'MOSTRA_ALUNO':
            return {
                aluno: action.payload
            }
        default:
            return state
    }
}

export const AlunoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alunoReducer, {
        aluno: null
    })

    return (
        <AlunoContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AlunoContext.Provider>
    )
}