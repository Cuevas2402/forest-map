import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompaniesProgressCard(){
	return (
		<>
			<Card x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
				<CardDescription>Active Companies</CardDescription>
				<CardTitle className="text-4xl">3</CardTitle>
				</CardHeader>
				<CardContent>
				</CardContent>
				<CardFooter>
				<Progress value={40} aria-label="increase" />
				</CardFooter>
			</Card>
		</>
	)
}