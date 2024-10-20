import { createBrowserRouter } from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/login/Login';
import Main from './layouts/main/Main';
import Dashboard from './views/dashboard/Dashboard';
import Trees from './views/zones/Zones';
import Users from './views/users/Users';
import Protection from './views/protection/Protection';
import Upload from './views/upload/Upload';

const router = createBrowserRouter([
	{
		path:"/auth",
		element:<Auth/>,
		children: [
			{
				index:true,
				element:<Login/>
			}
		]
	},
	{
		path:"/",
		element:<Protection><Main/></Protection>,
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