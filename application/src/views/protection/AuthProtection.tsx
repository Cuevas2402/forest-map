import useApp from "@/hooks/useApp"
import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom"


type AuthProtectionProps = {
	children : ReactNode
}

const AuthProtection : React.FC<AuthProtectionProps> = ({children}) => {

	const {token} = useApp();

	if (token != "") {
		return <Navigate to="/" replace/>
	}

	return children

}

export default AuthProtection;