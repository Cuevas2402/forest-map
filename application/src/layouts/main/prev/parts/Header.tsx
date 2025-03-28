import {  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbLink  } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { PanelLeft, Package2, Home, ShoppingCart, Package, Users2, LineChart, Search } from "lucide-react";
  
  export default function Header() {
	return (
		<header className="mt-3 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
				<PanelLeft className="h-5 w-5" />
				<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
				<a
					href="#"
					className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
				>
					<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
					<span className="sr-only">Acme Inc</span>
				</a>
				<a href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
					<Home className="h-5 w-5" /> Dashboard
				</a>
				<a href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
					<ShoppingCart className="h-5 w-5" /> Orders
				</a>
				<a href="#" className="flex items-center gap-4 px-2.5 text-foreground">
					<Package className="h-5 w-5" /> Products
				</a>
				<a href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
					<Users2 className="h-5 w-5" /> Customers
				</a>
				<a href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
					<LineChart className="h-5 w-5" /> Settings
				</a>
				</nav>
			</SheetContent>
			</Sheet>
			<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<a href="#">Dashboard</a>
				</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<a href="#">Products</a>
				</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
				<BreadcrumbPage>All Products</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
			</Breadcrumb>
			<div className="relative ml-auto flex-1 md:grow-0">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search..."
				className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
			/>
			</div>
			<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
				<img src="" alt="" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
  }
  