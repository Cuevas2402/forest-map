import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
import useZone from "@/hooks/useZone"
import { TreesDist } from "@/interfaces/props"

const chartConfig = {
	class: {
		label: "Class",
		color: "hsl(var(--chart-1))",
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


export default function ZonesClasses() {
    const keys: string[] = ["healthy", "light", "moderate", "several", "death"];

	const {zoneData} = useZone();

	const classesZone = zoneData.classes.map((clss : TreesDist) => ({
		category: keys[clss._id - 1],
		class: clss.total,
		fill: `var(--color-${keys[clss._id - 1]})`
	}))
	return (
		<Card className="w-full h-full">
			<CardHeader className="mb-10 flex items-center justify-center">
				<CardTitle>Trees health</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
				<BarChart
					accessibilityLayer
					data={classesZone}
					layout="vertical"
					margin={{
					right: 16,
					}}
				>
					<CartesianGrid horizontal={false} />
					<YAxis
					dataKey="category"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
					hide
					/>
					<XAxis dataKey="class" type="number" hide />
					<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
					/>
					<Bar
					dataKey="class"
					layout="vertical"
					fill="var(--color-class)"
					radius={4}
					>
					<LabelList
						dataKey="category"
						position="insideLeft"
						offset={8}
						className="text-white fill-[--color-label]"
						fontSize={12}
					/>
					<LabelList
						dataKey="class"
						position="right"
						offset={8}
						className="fill-foreground"
						fontSize={12}
					/>
					</Bar>
				</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
