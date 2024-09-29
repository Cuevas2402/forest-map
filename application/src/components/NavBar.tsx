
import {
	Bell,
	LineChart,
	Package,
	Users,
	TreeDeciduous,
	Trees,
	Code2,
	SquareTerminal
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"

export default function NavBar(){

	const location = useLocation();
	const path : string = location.pathname

	const csscl : string = "w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all "

	const isactive : string = csscl + " bg-black text-white  hover:text-neutral ";
	const noactive : string = csscl + " hover:text-white hover:bg-black ";

	return (
		<>
			<div className="min-h-screen hidden border-r bg-muted/40 md:block">
				<div className="flex  h-full flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<a href="/" className="flex items-center gap-2 font-semibold">
						<Trees className="h-6 w-6"/>
						<span className="">Forest Map</span>
						</a>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
						<Bell className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="flex flex-col gap-y-2 items-start px-2 text-sm font-medium lg:px-4">

							<Link to="/" className={path == "/" ? isactive : noactive}>
								<Package className="h-4 w-4" />
								Dashboard
							
							</Link>

							<Link to="/trees" className={path.indexOf("trees") != -1 ? isactive : noactive}>


								<TreeDeciduous className="h-4 w-4"/>
								Trees
							
							</Link>

							<Link to="/users" className={path.indexOf("users") != -1 ? isactive : noactive}>
								<Users className="h-4 w-4" />
								Users
							
							</Link>

							<Link to="#" className={noactive}>

								<LineChart className="h-4 w-4" />
								Analytics
							
							</Link>

							<Link to="#" className={noactive}>

								<SquareTerminal className="h-4 w-4" />

								Playground

							</Link>

							<Link to="#" className={noactive}>

								<Code2 className="h-4 w-4" />

								Models
							
							</Link>

						</nav>
					</div>
				</div>
			</div>
		
		</>
	)
}