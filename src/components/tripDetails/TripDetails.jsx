import React, { useEffect, useState } from 'react';
import useRequestService from '../../hooks/useRequestService';
import CountdownTimer from '../../counter/CountDownTimer';
import { daysOfWeek } from '../../data/daysOfWeek';
import { addDays, format, formatDate } from 'date-fns';
import './tripDetails.css';

const TripDetails = ({ selectedCity, setWeekWeather }) => {
  const { getData } = useRequestService();

  const getDaysOfWeek = (day) => {
    return daysOfWeek[new Date(day).getDay()];
  };
  const [todayData, setTodayData] = useState({});
  const icon = `/icons/${todayData.icon}.svg`;

  useEffect(() => {
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
            day: getDaysOfWeek(day.datetime),
          }))
        );
      });
    });
  }, [selectedCity]);

  return (
    <div className="details-container">
      <h2 className="details-day">{todayData.day}</h2>
      <div className="details-temp">
        <img width={50} height={50} src={icon} alt="Weather Icon" />
        <span>{todayData.temperature}˚C</span>
      </div>
      <p className="details-city">{todayData.city}</p>
      <CountdownTimer startDate={selectedCity.startDate} />
    </div>
  );
};

export default TripDetails;
