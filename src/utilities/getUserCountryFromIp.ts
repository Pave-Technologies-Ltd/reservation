function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not available in this browser."));
    }
  });
}





export default getUserLocation
