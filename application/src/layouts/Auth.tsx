import { Outlet } from "react-router-dom"
import fondologin from "../assets/fondologin.jpg"

export default function Auth(){

	return (

		<div className="w-full lg:grid lg:grid-cols-2">
			<div className="flex items-center justify-center py-12">
				<Outlet/>
			</div>
			<div className="bg-muted lg:block">
				<img
				src={fondologin}
				alt="Image"
				width="1920"
				height="1080"
				className="h-full w-full object-cover"
				/>
			</div>
		</div>

	)
}
