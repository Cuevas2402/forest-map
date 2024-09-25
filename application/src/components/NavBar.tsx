
import {
  Bell,
  Trees
} from "lucide-react"

import { Button } from "@/components/ui/button"
import NavLink from "./NavLink"

export default function NavBar(){

	const tabs = [
		{icon: "package", label : "Dashboard", href: "a" , isactive : true},
		{icon: "shoppingcart", label : "Orders", href: "a" , isactive : false},
		{icon: "users", label : "Users", href: "a" , isactive : false},
		{icon: "linechart", label : "Analytics", href: "a" , isactive : false},
	]
	return (
		<>
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
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
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{
								tabs.map((item) => (
									<NavLink {...item}/>
								))
							}
						</nav>
					</div>
				</div>
			</div>
		
		</>
	)
}