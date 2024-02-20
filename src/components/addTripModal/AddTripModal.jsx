import React from 'react';
import { format } from 'date-fns';
import { citysData } from '../../data/cityList';
import './addTrip.css';
import useForm from '../../hooks/useForm';

const AddTripModal = ({ setCityList, setOpenForm }) => {
  const {
    selectedCity,
    setEndErrorDate,
    startDate,
    errorStartDate,
    endDate,
    errorEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleCityChange,
  } = useForm();

  const handleCloseForm = () => setOpenForm(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errorStartDate || errorEndDate) {
      return;
    } else if (endDate < startDate) {
      setEndErrorDate(true);
      return;
    }
    const newCityCard = {
      city: selectedCity,
      image: citysData.find((city) => city.name === selectedCity)?.image || '',
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
    };
    setCityList((prev) => [...prev, newCityCard]);
    handleCloseForm();
  };

  return (
    <div className="block-form_visible">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-top">
          <h5 className="form-title">Create trip</h5>
          <button
            onClick={() => handleCloseForm(setOpenForm)}
            className="form-close">
            x
          </button>
        </div>
        <div className="form-content">
          <label className="form-label" htmlFor="citySelect">
            City:
          </label>
          <select
            required
            className="form-field"
            id="citySelect"
            value={selectedCity}
            onChange={handleCityChange}>
            <option value="">Please select a city</option>
            {citysData.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <div>
            <label className="form-label">Start date of youre trip:</label>
            <input
              className="form-field"
              type="date"
              value={format(startDate, 'yyyy-MM-dd')}
              onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />
            {errorStartDate && (
              <p style={{ color: 'red', fontSize: 12, margin: 0 }}>
                Date should be not earlier then today and within the next 15
                days
              </p>
            )}
          </div>
          <div>
            <label className="form-label">Last date of youre trip:</label>
            <input
              className="form-field"
              type="date"
              value={format(endDate, 'yyyy-MM-dd')}
              onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            />
            {errorEndDate && (
              <p style={{ color: 'red', fontSize: 12 }}>
                Date should be not less then start day and within the next 15
                days
              </p>
            )}
          </div>
        </div>
        <div className="form-bottom">
          <button
            onClick={() => handleCloseForm(setOpenForm)}
            className="button-empty">
            Cancel
          </button>
          <button className="button-submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTripModal;
