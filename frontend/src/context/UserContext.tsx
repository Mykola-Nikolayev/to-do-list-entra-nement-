import { createContext, ReactNode, useState, useMemo, useContext, useEffect } from 'react';
import { api } from '../config/api'
import { toast } from "react-toastify";


export interface ILoginFormValues {
    email: string;
    password: string;
}

export interface IRegisterValues {
    username: string;
    email: string;
    password: string
}

export const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    onLogin: async (values: ILoginFormValues) => {},
    onLogout: () => {},
    onRegister: async (values: IRegisterValues) => {}
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const onLogout = () => {
        localStorage.removeItem("authToken")

        setIsAuthenticated(false)

        toast.success("You are now logged out !")
    }

    const onRegister = async (values: IRegisterValues) => {
        try {
            const response = await api.post('/auth/register', values)

            localStorage.setItem("authToken", response?.data?.authToken)

            setIsAuthenticated(true)

            toast.success('You are registred now !')
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.error || "")
        }
    }

    const onLogin = async (values: ILoginFormValues) => {
        try{
            const response = await api.post('/auth/login', values)

            localStorage.setItem("authToken", response?.data?.authToken)

            setIsAuthenticated(true)

            toast.success('You are now logged in !')
        } catch (error: any) {
            console.log(error)
            toast.error(error?.response?.data?.error || "")
        }
    }

    const checkIsLogged = async () => {
        try {
            const response = await api.get('/auth/check-token')

            setIsAuthenticated(true)
        } catch (error: any) {
            onLogout()
            toast.error(error?.response?.data?.error || "")
        }
    }

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')

        if(!authToken) {
            setIsAuthenticated(false)
        } else {
            checkIsLogged();
        }
    }, [])

    const value = useMemo(() => ({
        user: null, 
        isAuthenticated,
        onLogin,
        onLogout,
        onRegister
    }), [isAuthenticated])

    return (
        <UserContext.Provider value={value}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}