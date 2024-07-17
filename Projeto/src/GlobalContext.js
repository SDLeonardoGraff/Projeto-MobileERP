import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({
        user: {},
        config: {},
        tokenDirectus: {}
    });

    const updateGlobalState = (newState) => {
        setGlobalState((prevState) => ({
            ...prevState,
            ...newState
        }));
    };

    return (
        <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalContext;

