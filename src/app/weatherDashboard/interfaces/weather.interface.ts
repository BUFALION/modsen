export interface IWeather {
  date: Date
  minTemp?: number,
  maxTemp?: number,
  currentTemp?: number,
  weatherCode: number,
  imgUrl: string
}
