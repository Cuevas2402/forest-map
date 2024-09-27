import NavBar from "@/components/NavBar"
import { Outlet } from "react-router-dom"
import Header from "./parts/Header"


export default function Main() {
  return (
    <div className="h-screen grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<NavBar/>
		<div className="flex flex-col overflow-y-scroll">
			<Header/>
			<main className="my-5" >
				<Outlet/>
			</main>
		</div>
    </div>
  )
}
