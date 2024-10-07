
import { Navigate } from "react-router-dom"



export default function Protection( {children}  : any){

	

	if ( !localStorage.getItem("token")) {
        return <Navigate to="/auth" replace />;
    }

    return children;

}