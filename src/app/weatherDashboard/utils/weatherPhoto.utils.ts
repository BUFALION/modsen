export function getPhotoUrl(code: number): string {
  const photoUrls: { [key: string]: string } = {
    45: "assets/fog.svg",
    61: "assets/slight-rain.svg",
    3: "assets/overcast.svg",
    80: "assets/slight-rain-shower.svg",

    // Другие коды и URL фото
  };

  return photoUrls[code] || "";
}
