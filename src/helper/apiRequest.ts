import axios from "axios";

export const getWeather = async (lat: number, lon: number, token: string) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BE_URL}/weather/city-weather?lat=${lat}&lon=${lon}`,
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.request(config);
    return response?.data || {};
  } catch (err) {
    throw err;
  }
};

export const getCities = async (cityPrefix: string, token: string) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BE_URL}/weather/city?cityPrefix=${cityPrefix}`,
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.request(config);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_BE_URL}/user/logout`);
  } catch (err) {
    throw err;
  }
};

export const getHistories = async (token: string) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BE_URL}/weather-search-history`,
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.request(config);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteHistories = async (
  token: string,
  candidatesToDelete: number[]
) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BE_URL}/weather-search-history`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: JSON.stringify({
        wshIds: candidatesToDelete,
      }),
    };

    await axios.request(config);
  } catch (err) {
    throw err;
  }
};
