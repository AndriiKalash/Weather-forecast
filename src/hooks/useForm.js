import { addDays } from 'date-fns';
import { useState } from 'react';

export default function useForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [errorStartDate, setStartErrorDate] = useState(false);
  const [errorEndDate, setEndErrorDate] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const handleStartDateChange = (date) => {
    const maxEndDate = addDays(startDate, 16);
    if (new Date() > date || date > maxEndDate) {
      setStartErrorDate(true);
      return;
    }
    setStartDate(date);
    setStartErrorDate(false);
  };

  const handleEndDateChange = (date) => {
    const maxEndDate = addDays(startDate, 15);

    if (date < startDate || date > maxEndDate) {
      setEndErrorDate(true);
      return;
    }
    setEndErrorDate(false);
    setEndDate(date);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return {
    selectedCity,
    setEndErrorDate,
    startDate,
    errorStartDate,
    endDate,
    errorEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleCityChange,
  };
}
