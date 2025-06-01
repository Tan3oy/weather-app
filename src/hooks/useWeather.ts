'use client'
import { Coordinates, CurrentWeatherData, WeatherForcast } from "@/app/api/types";
import { useQuery } from "@tanstack/react-query";

export const  fetchCurrentWeather= async ({lat,lon}:Coordinates):Promise<CurrentWeatherData> =>{
    const weatherApi=process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    console.log(weatherApi);
    
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApi}`
    console.log(url);
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    return res.json();
}
export const  fetchWeatherForcast= async ({lat,lon}:Coordinates):Promise<WeatherForcast> =>{
    const weatherApi=process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    console.log(weatherApi);
    
    const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&units=metric&appid=${weatherApi}`
    console.log(url);
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    return res.json();
}


export const useCurrentWeather=(Coordinates:Coordinates)=>{
  return useQuery<CurrentWeatherData>({
    queryKey:['Weather' , Coordinates.lat, Coordinates.lon],
    queryFn:()=>fetchCurrentWeather(Coordinates),
    staleTime:1000 * 60 * 5,
    gcTime:1000 * 60 * 5,
    enabled: !!Coordinates,
  })
}
export const useWeatherForeCast=(Coordinates:Coordinates)=>{
  return useQuery<WeatherForcast>({
    queryKey:['Forcast' , Coordinates.lat, Coordinates.lon],
    queryFn:()=>fetchWeatherForcast(Coordinates),
    staleTime:1000 * 60 * 5,
    gcTime:1000 * 60 * 5,
    enabled: !!Coordinates,
  })
}