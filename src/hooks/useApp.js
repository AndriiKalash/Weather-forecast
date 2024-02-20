import { useEffect, useRef, useState } from 'react';
import { citysData } from '../data/cityList';
import { addDays, format } from 'date-fns';

export function useApp() {
  const [cityList, setCityList] = useState([
    {
      city: 'Kyiv',
      image: citysData.find((city) => city.name === 'Kyiv')?.image || '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    },
  ]);

  const [searchTrip, setSearchTrips] = useState('');

  const [selectedCity, setSelectedCity] = useState({
    city: 'Kyiv',
    startDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const [openform, setOpenForm] = useState(false);

  const [weekWeather, setWeekWeather] = useState([]);

  const isMounted = useRef(false);

  //get data to storage
  useEffect(() => {
    if (isMounted.current) {
      const jsonCard = JSON.stringify(cityList);
      localStorage.setItem('cityList', jsonCard);
    }
    isMounted.current = true;
  }, [cityList]);

  //set Data from storage
  useEffect(() => {
    const localData = localStorage.getItem('cityList');
    if (localData) {
      setCityList(() => JSON.parse(localData));
    }
  }, []);

  return {
    cityList,
    setCityList,
    searchTrip,
    setSearchTrips,
    selectedCity,
    setSelectedCity,
    openform,
    setOpenForm,
    weekWeather,
    setWeekWeather,
  };
}
