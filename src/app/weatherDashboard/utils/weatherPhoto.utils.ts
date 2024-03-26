export function getPhotoUrl(code: number): string {
  const photoUrls: { [key: string]: string } = {
    45: "assets/fog.svg",
    "photo2": "//example.com/photo2.jpg",
    // Другие коды и URL фото
  };

  return photoUrls[code] || "assets/ef84cc932fcfe1ea548d296188b32fd8.png";
}
