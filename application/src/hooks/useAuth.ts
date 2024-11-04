import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import useClient from "./useClient";

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

    const {data : user, error, mutate} = useSWR('/user' ,() => 
        client('/user',{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors) 
        })
    )

    const login = async (datos : LoginData, setErrores : React.Dispatch<React.SetStateAction<string[]>>) => {

		try{
			const {data} = await client.post('/auth/login', datos);
			localStorage.setItem('token', data.token);
			setErrores([]);
            mutate();
		}catch (error){
			setErrores(['Error al hacer login']);
		}
    }


    const logout = async () => {

        try{
            await client.post('/auth', null, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
                }
            })
            localStorage.removeItem('token');
            mutate(undefined);
        } catch (error) {
            throw Error();
        }

    }

    useEffect(()=>{

        console.log(user)
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
