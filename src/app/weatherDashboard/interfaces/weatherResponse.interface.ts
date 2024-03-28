export interface IWeatherBaseResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
}

export interface IWeatherDailyResponse extends IWeatherBaseResponse {
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface IWeatherHourlyResponse extends IWeatherBaseResponse {
  hourly: {
    temperature_2m: number[];
    time: string[];
    weather_code: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    weather_code: string;
  };
}
