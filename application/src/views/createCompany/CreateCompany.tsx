import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClient from "@/hooks/useClient";
import { ChevronLeft } from "lucide-react";
import { createRef} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateCompany(){
	const client = useClient();
	const name = createRef<HTMLInputElement>();



	const handleSubmit = async () => {

		try {
			client.post("/company", { Name : name.current?.value})

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

	

	return (
		<>

			<div className="p-5 mx-auto grid w-full flex-1 auto-rows-max gap-4">

				<div className="flex items-center gap-4">

					<Link to="/companies">
						<Button variant="outline" size="icon" className="h-7 w-7">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Button>
					</Link>

					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Create Company
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
										ref={name}
										/>
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