import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/authContext/authContext"

export default function PrivateRoute({children}){

    const { user } =useAuth()
    if(!user){
        return <Navigate to="/login"/>
    }
    return children
}