"use client"

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
import useForest from "@/hooks/useForest"

const chartConfig = {
  heatlh: {
    label: "Health",
  },
  forest: {
    label: "Forest",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function HealthChart() {

	const { healthData} = useForest();

	return (
		<Card className="w-full h-full">

			<CardHeader className="items-center pb-0">
				<CardTitle>Forest health</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="items-center mx-auto aspect-square max-h-[250px]"
				>
					<RadialBarChart
						data={healthData}
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

						<RadialBar dataKey="heatlh" background cornerRadius={10} />

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
										className="fill-foreground text-3xl font-bold"
									>
										{healthData[0].heatlh.toLocaleString() + "%"}
									</tspan>
									<tspan
										x={viewBox.cx}
										y={(viewBox.cy || 0) + 24}
										className="fill-muted-foreground"
									>
										Healthy trees
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
