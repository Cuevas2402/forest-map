import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LinkCard(){
	return (
		<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
			<CardHeader className="pb-3">
			<CardTitle>Upload Zone</CardTitle>
			<CardDescription className="max-w-lg text-balance leading-relaxed">
				Introducing Our Dynamic Orders Dashboard for Seamless
				Management and Insightful Analysis.
			</CardDescription>
			</CardHeader>
			<CardFooter>
			<Link to={"/trees/upload"}><Button>Create New Zone</Button></Link>
			</CardFooter>
		</Card>

	)
}