import React from 'react';
import './weekWeather.css';

function WeekWeather({ weekWeather, loading, error }) {
  if (error !== null) {
    return <p style={{ color: 'red' }}>Something gone wrong </p>;
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <ul className="week-list">
      {weekWeather.map((item) => {
        const icon = `/icons/${item.icon}.svg`;
        return (
          <li className="week-list_item" key={item.day}>
            <p>{item.day}</p>
            <img src={icon} width={30} height={30} alt="weather icon" />
            <p>
              {item.tempMax}°/{item.tempMin}°
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default WeekWeather;
