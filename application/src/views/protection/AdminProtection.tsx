import { selectRid } from "@/redux/slices/userSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminProtection = ({children} : {children : ReactNode}) => {

	const rid = useSelector(selectRid);

	if (rid === undefined || rid != -1) {
		return <Navigate to="/" replace/>
	}

	return <>{children}</>;
}

export default AdminProtection;