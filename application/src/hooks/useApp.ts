import AppContext from "@/context/AppProvider";
import { useContext } from "react";


const useApp = () => {
	return useContext(AppContext);
}

export default useApp;