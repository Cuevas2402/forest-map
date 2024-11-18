import { selectToken } from "@/redux/slices/userSlice"
import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


type AuthProtectionProps = {
	children : ReactNode
}

const AuthProtection : React.FC<AuthProtectionProps> = ({children}) => {

	const token = useSelector(selectToken);

	if (token != "") {
		return <Navigate to="/" replace/>
	}

	return children

}

export default AuthProtection;