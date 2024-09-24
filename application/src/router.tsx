import { createBrowserRouter } from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/Login';
import Dashboard from './layouts/Dashboard';

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
		element:<Dashboard/>
	}
]);


export default router;