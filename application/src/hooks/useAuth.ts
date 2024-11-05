import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import useClient from "./useClient";
import useApp from "./useApp";

interface AuthProps {
	middleware : string;
	url : string;
}

interface LoginData{
	email : string | undefined;
	password : string | undefined;
}

export const useAuth  = ({middleware, url} : AuthProps) => {
	

	const navigate = useNavigate();

    const client = useClient();

    const {setUid, setCompanies, setRole, setToken} = useApp();

    const {data : user, error, mutate} = useSWR('/user' ,() => 
        client('/user')
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors) 
        })
    )

    const login = async (datos : LoginData, setErrores : React.Dispatch<React.SetStateAction<string[]>>) => {

		try{

			const {data} = await client.post('/auth/login', datos);

            console.log(data.token);
            setToken(data.token);
            setUid(data.uid);
            setCompanies(data.cid);
            setRole(data.rid);

			setErrores([]);
            mutate();

            return true;

		}catch (error){
			setErrores(['Error al hacer login']);
            return false;
		}
    }


    const logout = async () => {

        try{
            await client.post('/auth', null);
            localStorage.removeItem('token');
            mutate(undefined);
        } catch (error) {
            throw Error();
        }

    }

    useEffect(()=>{

        if(middleware === 'guest' && url && user){
            navigate(url);
        }

        if(middleware === 'auth' && error) {
            navigate('/auth');
        }

    }, [user, error, middleware, url, navigate]);

    return {
        login, 
        logout,
        user,
        error
    }

}
