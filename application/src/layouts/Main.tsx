import NavBar from "@/components/NavBar"
import TopBar from "@/components/TopBar"
import { Outlet } from "react-router-dom"


export default function Main() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<NavBar/>
		<div className="flex flex-col">
			<TopBar/>
			<main className="my-10" >
				<Outlet/>
			</main>
		</div>
    </div>
  )
}
