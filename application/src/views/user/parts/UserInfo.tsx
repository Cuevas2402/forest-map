import { Button } from "@/components/ui/button";
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UserInfo = () => {

	return (
		<>
			<div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">

				<div className="flex items-center gap-4">

					<Link to="/forests">
						<Button variant="outline" size="icon" className="h-7 w-7">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Button>
					</Link>

					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Forest
					</h1>

					<div className="hidden items-center gap-2 md:ml-auto md:flex">

						<Button variant="outline" size="sm">
							Discard
						</Button>

						<Button size="sm">Edit</Button>
					</div>

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
										<Label htmlFor="name">Name</Label>
										<Input
										id="name"
										type="text"
										className="w-full"
										defaultValue={"Backsjon"}
										readOnly
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="description">Location</Label>
											<Input
											id="name"
											type="text"
											className="w-full"
											defaultValue={"Sweden"}
											readOnly
											/>
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


export default UserInfo;