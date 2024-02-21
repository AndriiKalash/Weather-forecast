import { useEffect, useRef, useState } from 'react';
import { citysData } from '../data/cityList';
import { addDays, format, formatDate } from 'date-fns';
import { daysOfWeek } from '../data/daysOfWeek';
import useRequestService from './useRequestService';

export function useApp() {
  const { getData, loading, error } = useRequestService();
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
  const [todayData, setTodayData] = useState({});

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

  useEffect(() => {
    // week request from selected day:
    getData(
      selectedCity.city,
      selectedCity.startDate,
      format(addDays(selectedCity.startDate, 6), 'yyyy-MM-dd')
    ).then((responce) => {
      console.log(responce);
      setWeekWeather(() =>
        responce.days.map((day) => ({
          icon: day.icon,
          tempMax: day.tempmax,
          tempMin: day.tempmin,
          day: daysOfWeek[new Date(day.datetime).getDay()],
        }))
      );
    });
    // request from today:
    getData(
      selectedCity.city,
      'today',
      formatDate(addDays(new Date(), 6), 'yyyy-MM-dd')
    ).then((responce) => {
      console.log(responce);
      setTodayData({
        city: responce.address,
        day: daysOfWeek[new Date().getDay()],
        icon: responce.days[0].icon,
        temperature: responce.days[0].temp,
      });
    });
  }, [selectedCity]);

  return {
    cityList,
    setCityList,
    searchTrip,
    setSearchTrips,
    selectedCity,
    setSelectedCity,
    todayData,
    openform,
    setOpenForm,
    weekWeather,
    setWeekWeather,
    loading,
    error,
  };
}
