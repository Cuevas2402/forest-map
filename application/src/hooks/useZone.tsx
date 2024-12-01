import ZoneContext from "@/context/ZoneProvider";
import { useContext } from "react"

const useZone= () => {
	return useContext(ZoneContext);
}

export default useZone;