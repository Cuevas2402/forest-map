"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
	class: {
		label: "Class",
	},
	healthy: {
		label: "Healthy",
		color: "hsl(var(--chart-1))",
	},
	light: {
		label: "Light",
		color: "hsl(var(--chart-2))",
	},
	moderate: {
		label: "Moderate",
		color: "hsl(var(--chart-3))",
	},
	several: {
		label: "Several",
		color: "hsl(var(--chart-4))",
	},
	death: {
		label: "Death",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig

export default function ClassesChart() {

	const {classesData} = useForest();
	return (

		<Card className="w-auto h-full">

			<CardHeader className="items-center mb-10">
				<CardTitle>Trees health</CardTitle>
			</CardHeader>

			<CardContent className="items-center">

				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={classesData}
						layout="vertical"
						margin={{
						left: 0,
						}}
					>
						<YAxis
							dataKey="category"
							type="category"
							tickLine={false}
							tickMargin={0}
							axisLine={false}
							tickFormatter={(value) =>
								chartConfig[value as keyof typeof chartConfig]?.label
						}
						/>

						<XAxis dataKey="class" type="number" hide />

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>

						<Bar dataKey="class" layout="vertical" radius={5} />

					</BarChart>

				</ChartContainer>

			</CardContent>


		</Card>
	)
}
