
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

import { ReactNode } from "react";

interface GraphCardProps {
	children : ReactNode;
	title : string;
	description : string;
	footer1 : string;
	footer2 : string;
	
}

const GraphCard : React.FC<GraphCardProps> = ({children, title, description, footer1, footer2}) => {
	return (
		<>
			<Card className="h-full flex flex-col">
				<CardHeader className="items-center pb-0">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex-1 pb-0">

					{children}

				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
					{footer1}<TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
					{footer2}
					</div>
				</CardFooter>
			</Card>
		
		</>
	)
}

export default GraphCard;

