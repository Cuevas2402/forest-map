import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersProgressCard(){
	return (
		<>
			<Card x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
				<CardDescription>Active Users</CardDescription>
				<CardTitle className="text-4xl">4</CardTitle>
				</CardHeader>
				<CardContent>
				</CardContent>
				<CardFooter>
				<Progress value={70} aria-label="increase" />
				</CardFooter>
			</Card>
		</>
	)
}