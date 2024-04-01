import {IWeatherPhotoType} from "../interfaces/weatherPhotoType.interface";

export function getPhotoUrl(code: number): IWeatherPhotoType {
  const photoUrls: { [key: string]: IWeatherPhotoType } = {
    45: {
      backgroundImg: "assets/8766e0ed1d8b022a9ec9ae102e88e28f.png",
      iconImg:"assets/fog.svg",
    },
    61: {
      backgroundImg: "assets/8766e0ed1d8b022a9ec9ae102e88e28f.png",
      iconImg:"assets/slight-rain.svg"
    },
    3: {
      backgroundImg: "assets/8766e0ed1d8b022a9ec9ae102e88e28f.png",
      iconImg:"assets/overcast.svg"
    },
    80: {
      backgroundImg: "assets/8766e0ed1d8b022a9ec9ae102e88e28f.png",
      iconImg:"assets/slight-rain-shower.svg"
    }
  };

  return photoUrls[code] || "";
}
