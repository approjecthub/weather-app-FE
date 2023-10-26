declare type SuggestedCity = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

declare type WeatherData = {
  place: string;
  lat: number;
  lon: number;
  country: string;
  description: string;
  temparature: number;
  wind: number;
  humidity: number;
  pressure: number;
  userID: number;
  createdAt: number;
  id: number;
};
