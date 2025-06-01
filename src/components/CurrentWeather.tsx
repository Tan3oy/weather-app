import React from 'react'
import { CurrentWeatherData } from '@/app/api/types'
import { Card, CardContent } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
interface CurrentWeatherProps{
    data: CurrentWeatherData;
}
const CurrentWeather = ({data}:CurrentWeatherProps) => {
    const {
        weather:[weather],
        main:{ temp,feels_like,temp_min,temp_max,humidity},
        wind:{speed:windSpeed}
    } = data

    const formatTemperature=(temp:number)=>{
        return Math.round(temp)
    }   
  return (
    <div className='h-[100%]'>
        <Card className=' overflow-hidden bg-background h-full'>
            <CardContent className='flex h-full justify-between items-center  gap-4'>
                <div className="">
                    <div className="Main-Temperature flex items-center gap-6 mb-4">
                        <div className="">
                            <span className='text-[70px] font-bold'>{formatTemperature(temp)}°</span>
                            <span className='text-[60px]'>C</span>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <h2 className='text-muted-foreground'>Feels Like {formatTemperature(feels_like)}°C</h2>
                            <p className='flex items-center gap-2 text-sm'>
                                <span className='text-blue-400 flex items-center'>
                                    <ArrowDown className='inline-block h-[14px] w-[14px] mr-2'/>
                                    <span>{formatTemperature(temp_min)}°C</span>
                                </span>
                                <span className='text-red-400 flex items-center'>
                                    <ArrowUp className='inline-block h-[14px] w-[14px] mr-2'/>
                                    <span>{formatTemperature(temp_max)}°C</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="Main-rest flex justify-between">
                        <div className="flex items-start gap-1">
                            <Droplets className='inline-block mr-2 text-blue-500 h-5 w-5'/>
                            <div className=''>
                            <h1 className=' font-bold'>Humidity</h1>
                            <p className='w-fit mx-auto text-sm text-muted-foreground'>{humidity}%</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-1">
                            <Wind className='inline-block mr-2 text-blue-500 h-5 w-5'/>
                            <div className=''>
                            <h1 className=' font-bold'>Wind Speed</h1>
                            <p className='w-fit mx-auto text-sm text-muted-foreground'>{windSpeed}%</p>
                            </div>
                        </div>
                        <div className="">

                        </div>
                    </div>
                </div>
                <div className="Weather-Description-icon ">
                    <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="" />
                </div>
            </CardContent>
        </Card>
    </div>

  )
}

export default CurrentWeather