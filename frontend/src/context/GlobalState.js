import axios from "axios";
import React, { createContext, useReducer } from "react";
import TimeReducer from "./TimeReducer";

const BASE_URL = "http://localhost:8080"
 
const initialState = {
    workingHours: 0,
    dbId: null,
    running: false,
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TimeReducer, initialState);

    // Actions
    async function getWorkingHours() {
        try {
            const currentIsoDate = new Date().toISOString().substring(0, 10);

            const res = await axios.get(`${BASE_URL}/allHours?date=${currentIsoDate}`);
            console.log(res)
            dispatch({
                type: 'GET_WORKINGHOURS',
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: 'WORKINGHOURS_ERROR',
                payload: error.data
            })
            
        }
    }

    async function updateWorkingHours() {
        dispatch({
            type: 'UPDATE_WORKINGHOURS',
        })
    }

    return (<GlobalContext.Provider value={{
        workingHours: state.workingHours,
        dbId: state.dbId,
        running: state.running,
        error: state.error,
        loading: state.loading,
        getWorkingHours,
        updateWorkingHours
    }}>{children}
    </GlobalContext.Provider>
    )
}

