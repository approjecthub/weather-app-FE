import { useContext, useEffect, useState } from "react";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../../helper/toastMessage";
import { getCities, getWeather } from "../../helper/apiRequest";
import { AuthContext } from "../AuthContext";
import Map from "../Map";

const Home: React.FC = () => {
  const [searchedCity, setSearchedCity] = useState("");
  const [suggestedCities, setSuggestedCities] = useState<SuggestedCity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { getAuthToken, resetToken } = useContext(AuthContext);
  const [center, setCenter] = useState<[number, number]>([48.8566, 2.3522]);

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
          setSuggestedCities([]);
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
    evt:
      | React.MouseEvent<HTMLUListElement, MouseEvent>
      | React.KeyboardEvent<HTMLUListElement>
  ) => {
    const id = (evt.target as HTMLElement).id;
    const idx = id.split("_")[1];
    const city = suggestedCities[+idx];
    const { lat, lon, name } = city;
    setSearchedCity(name);
    setCenter([lat, lon]);
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

  const navigateToCity = (evt: React.KeyboardEvent<HTMLUListElement>) => {
    if (evt.target instanceof HTMLLIElement) {
      if (evt.key === "ArrowDown") {
        (
          (evt.target as HTMLElement).nextElementSibling as HTMLLIElement
        )?.focus();
      } else if (evt.key === "ArrowUp") {
        const target = (evt.target as HTMLElement)
          .previousElementSibling as HTMLLIElement;
        if (target) {
          target.focus();
        } else {
          const parent = (
            (evt.target as HTMLElement).parentElement as HTMLUListElement
          ).previousElementSibling as HTMLInputElement;
          parent.focus();
        }
      } else if (evt.key === "Enter") {
        selectCity(evt);
      }
    }
  };

  const navigateToFirstCity = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "ArrowDown") {
      (
        (evt.currentTarget.nextElementSibling as HTMLUListElement)
          ?.firstElementChild as HTMLLIElement
      )?.focus();
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
          {/* <label htmlFor="search-place">Enter city name</label> */}
          <input
            type="text"
            className="form-control"
            id="search-place"
            placeholder="Enter city name"
            onChange={handleTextChange}
            value={searchedCity}
            onKeyDown={navigateToFirstCity}
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={suggestedCities.length > 0}
            role="combobox"
            // aria-activedescendant={
            //   suggestedCities.length>0 ? `city_${focusedCityIndex}` : undefined
            // }
          />
          <ul
            id="suggestions-list"
            onClick={selectCity}
            style={{ listStyle: "none" }}
            onKeyDown={navigateToCity}
          >
            {suggestedCities.map((city, idx) => {
              return (
                <li
                  id={`city_${idx}`}
                  className="bg-white border p-2"
                  style={{ cursor: "pointer" }}
                  key={`city_${idx}`}
                  tabIndex={idx === 0 ? 0 : -1}
                  role="option"
                  // aria-selected={focusedCityIndex === idx}
                >
                  {city.name}
                </li>
              );
            })}
          </ul>
        </div>

        <Map center={center} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default Home;
