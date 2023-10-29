import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import DisplayWeather from "../DisplayWeather";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../helper/toastMessage";
import { deleteHistories, getHistories } from "../../helper/apiRequest";
import { AuthContext } from "../AuthContext";

const SearchHistory: React.FC = () => {
  const [openAccordianIndexes, setOpenAccordianIndexes] = useState<number[]>(
    []
  );
  const [weatherSearchHistories, setWeatherSearchHistories] = useState<
    WeatherData[]
  >([]);
  const [candidatesToDelete, setCandidatesToDelete] = useState<number[]>([]);
  const { getAuthToken, resetToken } = useContext(AuthContext);

  const handleCheckboxClick = (id: number) => {
    if (candidatesToDelete.includes(id)) {
      setCandidatesToDelete((datas) => datas.filter((x) => x !== id));
    } else {
      setCandidatesToDelete((prev) => [...prev, id]);
    }
  };

  const handleAccordionClick = (index: number) => {
    if (openAccordianIndexes.includes(index)) {
      setOpenAccordianIndexes((datas) => datas.filter((x) => x !== index));
    } else {
      setOpenAccordianIndexes((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    const getHistoryWrapper = async () => {
      try {
        const response = await getHistories(getAuthToken()!);
        setWeatherSearchHistories(response);
        showSuccessMessage("Weather search history fetched successfully");
      } catch (err: any) {
        if (err?.response?.status === 401) {
          showErrorMessage("Your session is expired");
          resetToken();
          return;
        }
        showErrorMessage(
          `Error while fetching Weather search history: ${
            err?.response?.data?.error || err.message
          }`
        );
      }
    };

    getHistoryWrapper();
  }, [getAuthToken, resetToken]);

  const handleDelete = async () => {
    try {
      await deleteHistories(getAuthToken()!, candidatesToDelete);
      setWeatherSearchHistories((datas) =>
        datas.filter(({ id }) => !candidatesToDelete.includes(id))
      );
      setCandidatesToDelete([]);
      setOpenAccordianIndexes([]);

      showSuccessMessage("Histories deleted successfully");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        showErrorMessage("Your session is expired");
        resetToken();
        return;
      }
      showErrorMessage(
        `Error while deleting Weather search history: ${
          err?.response?.data?.error || err.message
        }`
      );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mx-5 mt-5">
        <button
          className="btn btn-danger"
          disabled={candidatesToDelete.length === 0}
          onClick={() => handleDelete()}
        >
          Delete ( {candidatesToDelete.length} )
        </button>
      </div>
      <div className="d-flex flex-column align-items-center m-5">
        {weatherSearchHistories.map((item, index) => (
          <div className="accordion border p-2 w-100 d-flex" key={index}>
            <input
              className="form-check-input mx-2"
              type="checkbox"
              id="flexCheckDefault"
              onClick={() => handleCheckboxClick(item.id)}
              checked={candidatesToDelete.includes(item.id)}
            ></input>
            <div className="flex-grow-1">
              <div
                className={`accordion-header d-flex justify-content-between align-items-center bg-light`}
                onClick={() => handleAccordionClick(index)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="accordion-title mx-5">
                  {item.place},{item.country}
                </h3>
                <h6 className="text-primary">
                  {moment(item.createdAt).format("D MMM YYYY hA")}
                </h6>
              </div>
              {openAccordianIndexes.includes(index) && (
                <div className="accordion-body text-center">
                  <DisplayWeather weatherData={item} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchHistory;
