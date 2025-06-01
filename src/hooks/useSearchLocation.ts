'use client'

import { GeoCodingResponse } from "@/app/api/types"
import { useQuery } from "@tanstack/react-query"

const fetchSearchLocation= async(city:string):Promise<GeoCodingResponse[]>=>{
    const weatherApiKey= process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`
    try {
        const res=await fetch(url);
        return res.json()
    } catch (error) {
        throw new Error('Failed to fetch weather data')
    }    
}

export const useSearchLocation=(query:string)=>{
    return useQuery<GeoCodingResponse[]>({
        queryKey:['SearchLocation', query],
        queryFn:()=>fetchSearchLocation(query),
        staleTime:1000 * 60 * 5,
        gcTime:1000 * 60 * 5,
        enabled: query.length>=3,
    })
}