import { createBrowserRouter } from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/login/Login';
import Main from './layouts/main/Main';
import Dashboard from './views/dashboard/Dashboard';
import Trees from './views/trees/Trees';
import Users from './views/users/Users';

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
		element:<Main/>,
		children:[
			{
				index:true,
				element:<Dashboard/>
			},
			{
				path:"/trees",
				element:<Trees/>
			},
			{
				path:"/users",
				element:<Users/>
			}

		]
	}
]);


export default router;