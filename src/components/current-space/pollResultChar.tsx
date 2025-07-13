import {Bar , BarChart, CartesianGrid, XAxis} from "recharts"
import { ChartContainer, ChartConfig, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useContext } from "react";
import { MainContext } from "@/context";

const chatConfig = {
    want : {
        label : 'Want',
        color : "#2563eb"
    }
    ,
    dontWant : {
        label : "Don't Want",
        color : "#60a5fa"
    }
} satisfies ChartConfig


export default function PollResultChart({chartData} : {chartData :[{xlabel: 'want' , count : number },
    {xlabel : 'dontWant' , count :number },
]}) {
    
    return (
        <div className="w-full h-60 flex flex-col justify-center mt-10">
        <ChartContainer config={chatConfig} className="min-h-[200px] w-full  p-0">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false}/>
                <XAxis 
                dataKey={"xlabel"}
                />
            <ChartTooltip content={<ChartTooltipContent/>}/>
            {/* <ChartLegend content={<ChartLegendContent/>}/> */}
                <Bar dataKey={'count'} fill="var(--color-want)" radius={4}/>
            </BarChart>
        </ChartContainer>

        </div>
    )
}