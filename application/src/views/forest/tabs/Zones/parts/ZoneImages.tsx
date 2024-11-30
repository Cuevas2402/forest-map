import { Card, CardContent, CardHeader} from "@/components/ui/card";
import fondologin from "../../../../../assets/fondologin.jpg"

export default function ZoneImages () {
	return (
		<Card className="overflow-hidden h-full pt-5" x-chunk="dashboard-07-chunk-4">

			<CardContent>
				<div className="grid gap-2">

					<img
					alt="Product image"
					className="mt-3 aspect-square h-full w-full rounded-md object-cover"
					height="300"
					src={fondologin}
					width="300"
					/>
				</div>
			</CardContent>
		</Card>
	)
}