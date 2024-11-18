import { selectUid } from "@/redux/slices/userSlice";
import { ReactNode } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const UserProtection = ({children} : { children : ReactNode}) => {

	const uid = useSelector(selectUid);

	if (uid == -1 || uid == undefined) {
		return <Navigate to="/login" replace/>
	}

	return <>{children}</>;

}

export default UserProtection;