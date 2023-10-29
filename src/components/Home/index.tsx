import { useContext, useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../helper/toastMessage";
import DisplayWeather from "../DisplayWeather";
import { getCities, getWeather } from "../../helper/apiRequest";
import { AuthContext } from "../AuthContext";

const Home: React.FC = () => {
  const [searchedCity, setSearchedCity] = useState("");
  const [suggestedCities, setSuggestedCities] = useState<SuggestedCity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { getAuthToken, resetToken } = useContext(AuthContext);

  useEffect(() => {
    const delay = 500; // Adjust the debounce delay as needed

    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const getCitiesWrapper = async () => {
        try {
          const response = await getCities(
            debouncedSearchTerm,
            getAuthToken()!
          );
          setSuggestedCities(Array.isArray(response) ? response : []);
        } catch (err: any) {
          if (err?.response?.status === 401) {
            showErrorMessage("Your session is expired");
            resetToken();
          }
        }
      };
      getCitiesWrapper();
    }
  }, [debouncedSearchTerm, getAuthToken, resetToken]);

  const handleTextChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = evt.target.value;
    setSearchTerm(newSearchTerm);
    setSearchedCity(newSearchTerm);
  };

  const selectCity = async (
    evt: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const id = (evt.target as HTMLUListElement).id;
    const idx = id.split("_")[1];
    const city = suggestedCities[+idx];
    const { lat, lon, name } = city;
    setSearchedCity(name);
    setSuggestedCities([]);

    try {
      const data = await getWeather(lat, lon, getAuthToken()!);
      setWeatherData(data);
      showSuccessMessage("Weather data is fetched successfully");
    } catch (err: any) {
      showErrorMessage(
        `Error while fetching Weather Data: ${
          err?.response?.data?.error || err.message
        }`
      );
      if (err?.response?.status === 401) {
        showErrorMessage("Your session is expired");
        resetToken();
      }
    }
  };

  return (
    <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <div className="container p-5 m-2 bg-light ">
        <h4 className="text-center">Weather Forecast</h4>
        <p className="text-center">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search-place"
            placeholder="Enter city name"
            onChange={handleTextChange}
            value={searchedCity}
          />
          <ul onClick={selectCity} style={{ listStyle: "none" }}>
            {suggestedCities.map((city, idx) => {
              return (
                <li
                  id={`city_${idx}`}
                  className="bg-white border p-2"
                  style={{ cursor: "pointer" }}
                >
                  {city.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {weatherData && <DisplayWeather weatherData={weatherData} />}
    </div>
  );
};

export default Home;
