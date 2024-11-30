import { createContext, ReactNode } from "react"

const ForestContext = createContext<any>(undefined);

interface ForestProviderProps {
	children : ReactNode
}

const ForestProvider : React.FC<ForestProviderProps> = ({children}) => {


	return (
		<ForestContext.Provider value={{}}>
			{children}
		</ForestContext.Provider>
	)

}

export {
	ForestProvider
}
export default ForestContext;