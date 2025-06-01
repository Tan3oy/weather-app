import { WeatherForcast } from '@/app/api/types'
import { format } from 'date-fns';
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent } from './ui/card';

interface HourlyTempereatureProps{
    data : WeatherForcast
}
interface TemperatureChartData{
    time: string;
    temp: number;
    feels_like: number;
}
const HourlyTempereature = ({data}:HourlyTempereatureProps) => {
    const {list:TemperatureList} = data;
    const chartData : TemperatureChartData[] = TemperatureList.map((items)=>(
        {
            time : format(new Date(items.dt * 1000), 'ha'),
            temp : Math.round(items.main.temp),
            feels_like : Math.round(items.main.feels_like)
        }
    ))
    console.log('HourlyTempereature: ', chartData);
    

  return (
        <Card className='bg-background '>
            <CardContent >
                <h2 className='text-lg font-semibold'>Today's Temperature</h2>
            </CardContent>
            <CardContent className='h-[200px]'>
            <div className="h-full">
                <ResponsiveContainer width={"100%"} height={"100%"} >
                    <LineChart data={chartData}>
                        <Line type="monotone" dataKey="temp" stroke="#4075ba" />
                        <Line type="monotone" dataKey="feels_like" stroke="#ff0000" dot={false}  strokeDasharray="5 5"/>
                        <XAxis dataKey="time" tickLine={false} />
                        <YAxis tickLine={false} />
                        <Tooltip content={
                            ({active,payload})=>{
                                if(active && payload){
                                    return(
                                        <Card className='bg-background p-4'>
                                            <CardContent>
                                                <div className="flex gap-2">
                                                <h1 className='text-muted-foreground '>Temperature</h1>
                                                <h1 className='text-center'>{payload[0].value}° C</h1>
                                                </div>
                                                <div className="flex gap-2">
                                                    <h1 className='text-muted-foreground '>Feels Like</h1>
                                                    <h1>{payload[1].value}°C</h1>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                }
                            }
                        } />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            </CardContent>
        </Card>
  )
}

export default HourlyTempereature