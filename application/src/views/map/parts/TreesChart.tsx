import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TreesChartProps } from "@/interfaces/props"

const info = [
    ["heatlhy", "var(--color-healthy)" ],
    ["light", "var(--color-light)" ],
    ["moderate","var(--color-moderate)"],
    ["several", "var(--color-several)"],
    ["dead" ,"var(--color-dead)" ]

]


const chartConfig = {
    visitors: {
        label: "Trees",
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
    dead: {
        label: "Dead",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig



export function TreesChart({dist} : TreesChartProps) {

    const data = dist.map((tree) => {
        return { browser: info[tree._id-1][0], visitors: tree.total, fill: info[tree._id-1][1]} ;
    })


    const [total, setTotal] = React.useState<Number>(0);

    React.useEffect(
        ()=> {
            setTotal(()=> {
                return data.reduce((acc, curr) => acc + curr.visitors, 0)
            })
        }
        ,[data]
    )


    return (
        <Card className="flex flex-col">

            <CardHeader className="items-center pb-0">
                <CardTitle>Forest Health</CardTitle>
                <CardDescription>Trees distribution</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                        data={data}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius={60}
                        strokeWidth={5}
                        >
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
                                    {total.toLocaleString()}
                                    </tspan>
                                    <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                    >
                                        Trees
                                    </tspan>
                                </text>
                                )
                            }
                            }}
                        />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
