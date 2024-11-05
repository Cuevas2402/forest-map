import useApp from "@/hooks/useApp";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const AdminProtection = ({children} : {children : ReactNode}) => {

	const { role } = useApp();

	if (role === undefined || role != -1) {
		return <Navigate to="/" replace/>
	}

	return <>{children}</>;
}

export default AdminProtection;