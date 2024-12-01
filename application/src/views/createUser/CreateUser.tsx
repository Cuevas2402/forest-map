import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useClient from "@/hooks/useClient";
import Company from "@/interfaces/company";
import { ChevronLeft } from "lucide-react";
import { createRef, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useSWR from "swr";

export default function CreateUser(){
	const client = useClient();
	const firstName= createRef<HTMLInputElement>();
	const lastName = createRef<HTMLInputElement>();
	const email = createRef<HTMLInputElement>();
	const password = createRef<HTMLInputElement>();
	const rid = useRef<string>("");
	const cid = useRef<string>("");



	const handleSubmit = async () => {

		const user : any = {

			FirstName : firstName.current?.value,
			LastName : lastName.current?.value,
			Email : email.current?.value,
			Password : password.current?.value,

		}

		const usermapping : any = {

			Rid : parseInt(rid.current), 
			Cid : parseInt(cid.current),

		}

		try {
			const response : any = client.post("/register/user", {user, usermapping})

			Swal.fire({
				title: "OK!",
				text: "User saved",
				icon: "success"
			});
			
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: "User not saved",
				icon: "error"
			});
			
			
		}




	}

	const fetcher = async () => {
		const response = await client.get("/companies")
		return response.data.companies
	}

	const {data, error, isLoading} = useSWR('/api/companies', fetcher)
	if(data){}
	if(error) { return <div>Error al cargar los datos</div> };
	if(isLoading) { return <Spinner/> }

	

	return (
		<>

			<div className="p-5 mx-auto grid w-full flex-1 auto-rows-max gap-4">

				<div className="flex items-center gap-4">

					<Link to="/users">
						<Button variant="outline" size="icon" className="h-7 w-7">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Button>
					</Link>

					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Create User
					</h1>

				</div>

				<div className="grid gap-4 lg:gap-8">

					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">

						<Card x-chunk="dashboard-07-chunk-0">

							<CardHeader>
								<CardTitle>Details</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Label htmlFor="name">First Name</Label>
										<Input
										id="name"
										type="text"
										className="w-full"
										defaultValue={"Backsjon"}
										ref={firstName}
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Last Name</Label>
											<Input
											id="name"
											type="text"
											className="w-full"
											defaultValue={"Sweden"}
											ref={lastName}
											/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Email</Label>
											<Input
											id="name"
											type="text"
											className="w-full"
											defaultValue={"Sweden"}
											ref={email}
											/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Password</Label>
											<Input
												id="name"
												type="password"
												className="w-full"
												defaultValue={"Sweden"}
												ref={password}
											/>
									</div>

									<div className="grid grid-cols-2 w-full gap-3">
										<div>
											<Select  onValueChange={(value) => { cid.current = value; }}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a Company" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Companies</SelectLabel>
														{
															data.map((company : Company) => (

																	<SelectItem value={company.Cid.toString()}>{company.Name}</SelectItem>
																)

															)
														}
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
										<div>
											<Select onValueChange={(value) => {rid.current = value}}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a Role" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Roles</SelectLabel>
														<SelectItem value="2">Admin</SelectItem>
														<SelectItem value="3">User</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>
									</div>

									<div className="flex justify-center items-center gap-3">
										<Button className="w-2/6" onClick={()=>handleSubmit()}>Submit</Button>
									</div>

								</div>

							</CardContent>
						</Card>
					</div>
				</div>

			</div>
		</>
	)

}