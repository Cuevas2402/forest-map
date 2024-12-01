import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import useZone from "@/hooks/useZone"
import { TreesDist } from "@/interfaces/props"

const chartConfig = {
	heatlh: {
		label: "Health",
	},
	forest: {
		label: "Forest",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig


export default function ZoneHealth() {

	const {zoneData} = useZone();
	const total = zoneData.classes.reduce((acc: number, classItem: TreesDist) => acc + classItem.total, 0);
	const sub = zoneData.classes.reduce((acc: number, curr: TreesDist) => {
		if ([1, 2, 3].includes(curr._id)) {
			return acc + curr.total;
		}
		return acc;
	}, 0);

	const healthZone = [{ category: "forest", health: ((sub / total) * 100).toFixed(0), fill: "var(--color-forest)" }]

	return (
		<Card className="w-full h-full ">
		<CardHeader className="mb-5 items-center pb-0">
			<CardTitle>Zone health</CardTitle>
		</CardHeader>
		<CardContent className="flex-1 pb-0">
			<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[350px]"
			>
			<RadialBarChart
				data={healthZone}
				startAngle={0}
				endAngle={250}
				innerRadius={80}
				outerRadius={110}
			>
				<PolarGrid
				gridType="circle"
				radialLines={false}
				stroke="none"
				className="first:fill-muted last:fill-background"
				polarRadius={[86, 74]}
				/>
				<RadialBar dataKey="health" background cornerRadius={10} />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
				<Label
					content={({ viewBox }) => {
					if (viewBox && "cx" in viewBox && "cy" in viewBox) {
						return (
						<text
							x={viewBox.cx}
							y={viewBox.cy}
							textAnchor="middle"
							dominantBaseline="middle"
						>
							<tspan
							x={viewBox.cx}
							y={viewBox.cy}
							className="fill-foreground text-4xl font-bold"
							>
							{healthZone[0].health.toLocaleString()+"%"}
							</tspan>
							<tspan
							x={viewBox.cx}
							y={(viewBox.cy || 0) + 24}
							className="fill-muted-foreground"
							>
								Healthy area
							</tspan>
						</text>
						)
					}
					}}
				/>
				</PolarRadiusAxis>
			</RadialBarChart>
			</ChartContainer>
		</CardContent>
		</Card>
	)
}
