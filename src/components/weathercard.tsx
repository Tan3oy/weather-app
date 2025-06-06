// components/WeatherCard.tsx
'use client'
import { useCurrentWeather } from '../hooks/useWeather';

export default function WeatherCard() {
  const { data:WeatherData, isLoading, error,refetch } = useCurrentWeather({lat:22.5697,lon:88.3697});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="px-5 py-1 w-fit bg-green-400 text-white rounded-md cursor-pointer"
      onClick={()=>refetch()}
      >reset</div>
      <h2>{WeatherData?.coord.lat}</h2>
      <h2>{WeatherData?.coord.lon}</h2>
      <h1>{WeatherData?.weather[0].description}</h1>
      <img src={`https://openweathermap.org/img/wn/${WeatherData?.weather[0].icon}@2x.png`} alt="" />
      <div className="">
        { WeatherData &&
          Object.entries(WeatherData.main).map(([Key,value],i)=>(
            <h1 key={i}>{Key}:{value}</h1>
          ))
        }
      </div>
    </div>
  );
}
