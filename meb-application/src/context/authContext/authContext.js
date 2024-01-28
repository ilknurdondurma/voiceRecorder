import { createContext,useContext, useEffect, useState } from "react";

const Context =createContext();
export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        return storedUser || false;
      });
    const data ={
        user,
        setUser
    }
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
      }, [user]);

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}
export const useAuth=()=>useContext(Context)
