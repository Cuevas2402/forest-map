
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react";

interface InfoCardProps {
	children : ReactNode;
	title : string;
	value : string;
	description : string;

}

const InfoCard : React.FC<InfoCardProps> = ({children, title, value, description}) => {
	return (
		<>

			<Card className="w-full h-full" x-chunk="dashboard-01-chunk-0">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{title}
				</CardTitle>
				{children}
				</CardHeader>
				<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				<p className="text-xs text-muted-foreground">
					{description}
				</p>
				</CardContent>
			</Card>
		
		</>
	)
}

export default InfoCard;