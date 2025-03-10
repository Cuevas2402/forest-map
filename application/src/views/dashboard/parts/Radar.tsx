import LineGraph from "@/components/Graphs/LineGraph";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";


export default function CardLine(){
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Line Chart - Label</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent>

					<LineGraph />

				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
					</div>
				</CardFooter>
			</Card>
		</>
	)
}