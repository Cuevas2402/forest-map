import React, { createContext , ReactNode, useState} from "react";

type AppContextProps = {
	uid : number | undefined;
	setUid : (uid : number ) => void;
	companies : number[] | undefined;
	setCompanies : (companies : number[]) => void;
	token : string | undefined;
	setToken : (token : string) => void;

};

const AppContext = createContext<AppContextProps>(
	{
		uid : -1,
		setUid : () => {},
		companies : [],
		setCompanies : () => {},
		token : "",
		setToken : () => {}
	}
);

type AppProviderProps = {
    children: ReactNode;
};

const AppProvider : React.FC<AppProviderProps> = ({children}) => {

	const [uid, setUid] = useState<number>();
	const [companies, setCompanies] = useState<number[]>();
	const [token, setToken] = useState<string>();


	return (
		<AppContext.Provider value={
			{
				uid,
				setUid,
				companies,
				setCompanies,
				token,
				setToken
			}
		} >
			{children}
		</AppContext.Provider>
	)

}

export {
	AppProvider
}

export default AppContext;

