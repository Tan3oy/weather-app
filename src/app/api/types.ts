export interface Coordinates {
  lat: number;
  lon: number;
}
export interface GeoCodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface WindData {
    speed: number;
    deg: number;
    gust: number;
}
interface ForcastList {
  dt: number;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: { all: number };
  wind: WindData;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: { pod: number };
  dt_txt: string;
}
interface Rain {
  "3h": number;
}
interface ForcastCityData {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
export interface CurrentWeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: WeatherMain;
  visibility: number;
  wind: WindData;
}
export interface WeatherForcast {
  cod: string;
  message: number;
  cnt: number;
  list: ForcastList[];
  city: ForcastCityData;
}
