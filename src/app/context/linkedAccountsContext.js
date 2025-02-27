"use client"

import { useState, useEffect, createContext, useContext } from "react";
import { getLinkedAccounts } from "@/app/utils/server-actions/linkingActions";
import { useUser } from "./userContext";

const LinkedAccountsContext = createContext();

export const LinkedAccountsProvider = ({ children }) => {
    const { user } = useUser();
    const [linkedAccounts, setLinkedAccounts] = useState([]);

    useEffect(() => {
        const fetchLinkedAccounts = async () => {
            const linkedAccounts = await getLinkedAccounts(user.id);
            setLinkedAccounts(linkedAccounts);
        };
        fetchLinkedAccounts();
    }, [user.id]);
    
    return (
        <LinkedAccountsContext.Provider value={{ linkedAccounts, setLinkedAccounts }}>
            {children}
        </LinkedAccountsContext.Provider>
    );
}

export const useLinkedAccounts = () => useContext(LinkedAccountsContext);