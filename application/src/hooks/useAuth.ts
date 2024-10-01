import client from "@/config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';

interface AuthProps {
	middleware : string;
	url : string;
}

interface LoginData{
	username : string;
	password : string;
}

export const useAuth  = ({middleware, url} : AuthProps) => {
	

	const navigate = useNavigate();

    const {data : user, error, mutate} = useSWR('/api/user',() => 
        client('/api/user',{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors) 
        })
    )

    const login = async (datos : LoginData, setErrores : React.Dispatch<React.SetStateAction<string[]>>) => {

		try{
			const {data} = await client.post('/api/login', datos);
			localStorage.setItem('AUTH_TOKEN', data.token);
			setErrores([]);
            await mutate();
		}catch (error){
			setErrores(['Error al hacer login']);
		}
    }


    const logout = async () => {

        try{
            await client.post('/api/logout', null, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
                }
            })
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
        } catch (error) {
            throw Error();
        }

    }

    useEffect(()=>{
        if(middleware === 'guest' && url && user){
            navigate(url);
        }

        if(middleware === 'auth' && error)  {
            navigate('/auth/login');
        }
    }, [user, error]);

    return {
        login, 
        logout,
        user,
        error
    }
}
