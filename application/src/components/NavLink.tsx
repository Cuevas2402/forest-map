
import {
	Bell,
	LineChart,
	Package,
	ShoppingCart,
	Users,
} from "lucide-react"


interface LinkProps {
	icon : string;
	label : string;
	href : string;
	isactive : boolean;
}

export default function ({icon, label, href, isactive} : LinkProps){

	const csscl : string = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all "

	return (
		<>
			<a
				href={href}
				className={isactive ? csscl + " bg-black text-white  hover:text-neutral" : csscl + "hover:text-white hover:bg-black"}
			>
				{(() => {
					switch (icon) {
						case 'package':
							return (
								<Package className="h-4 w-4" />
							)
						case 'bell':
							return (
								<Bell className="h-4 w-4" />
							)
						case 'linechart':
							return (
								<LineChart className="h-4 w-4" />
							)
						case 'users':
							return (
								<Users className="h-4 w-4" />
							)
						case 'shoppingcart':
							return (
								<ShoppingCart className="h-4 w-4" />
							)
					}
				})()}

				{label}	

				
			</a>
		
		</>
	)
}