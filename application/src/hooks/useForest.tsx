import ForestContext from "@/context/ForestProvider"
import { useContext } from "react"

const useForest = () => {
	return useContext(ForestContext);
}

export default useForest;