const DisplayWeather: React.FC<{ weatherData: WeatherData }> = ({
  weatherData,
}) => {
  return (
    <div className="container p-5 m-2 bg-light d-flex flex-wrap justify-content-between">
      <div className="d-flex flex-column">
        <p className="mb-0">Place</p>
        <p className="text-primary">{weatherData.place}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="mb-0">country</p>
        <p className="text-primary">{weatherData.country}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="mb-0">description</p>
        <p className="text-primary">{weatherData.description}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="mb-0">temparature</p>
        <p className="text-primary">{weatherData.temparature}&deg;C</p>
      </div>
    </div>
  );
};

export default DisplayWeather;
