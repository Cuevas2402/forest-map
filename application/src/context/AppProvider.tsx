import React, { createContext , ReactNode, useState} from "react";

type AppContextProps = {
	uid : number | undefined;
	setUid : (uid : number ) => void;
	companies : number | undefined;
	setCompanies : (companies : number) => void;
	token : string | undefined;
	setToken : (token : string) => void;
	role : number | undefined;
	setRole : (role : number ) => void;

};

const AppContext = createContext<AppContextProps>(
	{
		uid : -1,
		setUid : () => {},
		companies : -1,
		setCompanies : () => {},
		token : "",
		setToken : () => {},
		role : -1,
		setRole: () => {}
	}
);

type AppProviderProps = {
    children: ReactNode;
};

const AppProvider : React.FC<AppProviderProps> = ({children}) => {

	const [uid, setUid] = useState<number>(-1);
	const [companies, setCompanies] = useState<number>(-1);
	const [token, setToken] = useState<string>("");
	const [role, setRole] = useState<number>(-1);


	return (
		<AppContext.Provider value={
			{
				uid,
				setUid,
				companies,
				setCompanies,
				token,
				setToken,
				role,
				setRole
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

