import React from 'react'
import {createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer"
const STATUT_INITIAL = {
    user : null,
    isFetching : false,
    error : false,
};

export const AuthContext = createContext(STATUT_INITIAL);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, STATUT_INITIAL );

    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error:state.error, dispatch,}}>{children}</AuthContext.Provider>
    )
}
