import useApp from "@/hooks/useApp"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom";


const UserProtection = ({children} : { children : ReactNode}) => {

	const {uid} = useApp();

	if (uid == -1 || uid == undefined) {
		return <Navigate to="/login" replace/>
	}

	return <>{children}</>;

}

export default UserProtection;