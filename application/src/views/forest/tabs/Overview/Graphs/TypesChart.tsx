import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useForest from "@/hooks/useForest"

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function TypesChart() {

	const {typesData} = useForest();

	return (
			<Card className="h-full">

				<CardHeader className="items-center">
					<CardTitle>Trees Species</CardTitle>
				</CardHeader>

				<CardContent className="pb-0">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[250px]"
					>
						<RadarChart data={typesData}>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<PolarAngleAxis dataKey="species" />
							<PolarGrid />
							<Radar
							dataKey="total"
							fill="var(--color-total)"
							fillOpacity={0.6}
							dot={{
								r: 4,
								fillOpacity: 1,
							}}
							/>
						</RadarChart>

					</ChartContainer>

				</CardContent>

			</Card>
	)
}
