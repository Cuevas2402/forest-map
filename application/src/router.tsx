import { createBrowserRouter} from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/login/Login';
import Main from './layouts/main/Main';
import Dashboard from './views/dashboard/Dashboard';
import Trees from './views/zones/Zones';
import Users from './views/users/Users';
import Upload from './views/upload/Upload';
import UserProtection from './views/protection/UserProtection';
import AuthProtection from './views/protection/AuthProtection';

const router = createBrowserRouter([
	{
		path:"/login",
		element:<AuthProtection> <Auth/> </AuthProtection>,
		children: [
			{
				index:true,
				element:<Login/>
			}
		]
	},
	{
		path:"/",
		element:<UserProtection><Main/></UserProtection>,
		children:[
			{
				index:true,
				element:<Dashboard/>
			},
			{
				path:"/trees",
				element:<Trees/>,
			},
			{
				path:"/trees/upload",
				element:<Upload/>
			},
			{
				path:"/users",
				element:<Users/>
			}

		]
	}
]);


export default router;