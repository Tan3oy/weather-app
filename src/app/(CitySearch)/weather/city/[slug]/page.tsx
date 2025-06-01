'use client'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTempereature from '@/components/HourlyTempereature'
import { Card, CardContent } from '@/components/ui/card'
import { useCurrentWeather, useWeatherForeCast } from '@/hooks/useWeather'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const CityWeather = () => {
  const searchParams = useSearchParams()
  const lattitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')
  const Coordinates ={
    lat: lattitude ? parseFloat(lattitude) : 0,
    lon: longitude ? parseFloat(longitude) : 0
  }

  const currentWeatherQuery = useCurrentWeather(Coordinates)
  console.log('WeatherForcast: ', currentWeatherQuery?.data);
  const weatherForcastQuery = useWeatherForeCast(Coordinates)
  console.log('WeatherForcast: ', weatherForcastQuery?.data);
  
  return (
    <div>
      <h1>City Weather</h1>
      <div className="flex gap-8 items-stretch w-full">
        <div className="w-[40%]">
            { currentWeatherQuery.data && <CurrentWeather data={currentWeatherQuery.data} />}                 
        </div>
        <div className="flex-1">
          {weatherForcastQuery.data && <HourlyTempereature data={weatherForcastQuery.data} />}
        </div>
      </div>
    </div> 
  )
}

export default CityWeather