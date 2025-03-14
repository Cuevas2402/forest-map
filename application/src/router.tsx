import { createBrowserRouter} from 'react-router-dom';
import Auth from "./layouts/Auth";
import Login from './views/login/Login';
import Dashboard from './views/dashboard/Dashboard';
import ForestView from './views/forest/Forest';
import Users from './views/users/Users';
import Upload from './views/upload/Upload';
//import UserProtection from './views/protection/UserProtection';
import AuthProtection from './views/protection/AuthProtection';
import Main from './layouts/main/Main';
import UserProtection from './views/protection/UserProtection';
import Companies from './views/companies/Companies';
import Forests from './views/forests/Forests';
import ZoneMap from './views/map/ZoneMap';
import { ForestProvider } from './context/ForestProvider';
import CreateUser from './views/createUser/CreateUser';
import CreateCompany from './views/createCompany/CreateCompany';

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
				path:"/forest/:id",
				element:<ForestProvider><ForestView/></ForestProvider>,
			},
			{
				path:"/trees/upload",
				element:<Upload/>
			},
			{
				path:"/users",
				element:<Users/>,
			},
			{
				path:"/user/create",
				element: <CreateUser/>
			},
			{
				path:"/companies",
				element:<Companies/>
			},
			{
				path:"/company/create",
				element:<CreateCompany/>
			},
			{
				path:"/forests",
				element:<Forests/>
			},
			{
				path:"/map",
				element:<ZoneMap/>
			}

		]
	}
]);


export default router;