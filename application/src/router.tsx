import { createBrowserRouter } from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/Login';
import Main from './layouts/Main';
import Dashboard from './views/Dashboard';

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
			}
		]
	}
]);


export default router;