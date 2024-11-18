import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import useClient from "./useClient";
import { useDispatch } from "react-redux";
import { setCid, setRid, setToken, setUid } from "redux/slices/userSlice";

interface AuthProps {
	middleware : string;
	url : string;
}

interface LoginData{
	email : string | undefined;
	password : string | undefined;
}

export const useAuth  = ({middleware, url} : AuthProps) => {
    
    const dispatch = useDispatch();

	const navigate = useNavigate();

    const client = useClient();

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

            dispatch(setToken({token : data.token}));
            dispatch(setUid({ uid : data.uid} ));
            dispatch(setCid({ cid : data.cid}));
            dispatch(setRid({ rid : data.rid}));

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
            dispatch(setToken({token : ""}));
            dispatch(setUid({ uid : -1} ));
            dispatch(setCid({ cid : -1}));
            dispatch(setRid({ rid : -1}));
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
