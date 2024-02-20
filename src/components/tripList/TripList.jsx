import React, { useState } from 'react';
import './tripList.css';

const TripList = ({ cityList, searchTrip, setSelectedCity, setOpenForm }) => {
  const [currentCard, setCurrentCard] = useState(0);

  //sorting lisrt prop:
  const sortedCityList = cityList.sort((a, b) => {
    const [yearA, monthA, dayA] = a.startDate.split('-');
    const dateA = new Date(
      `${yearA}-${monthA.padStart(2, '0')}-${dayA.padStart(2, '0')}T23:59:59`
    );
    const [yearB, monthB, dayB] = b.startDate.split('-');
    const dateB = new Date(
      `${yearB}-${monthB.padStart(2, '0')}-${dayB.padStart(2, '0')}T23:59:59`
    );
    return dateA - dateB;
  });

  //searched obj
  const foundCity = sortedCityList.find(
    (item) => item.city.toLowerCase() === searchTrip.toLowerCase()
  );

  // render conditions:
  const { city, startDate, image, endDate } =
    foundCity || sortedCityList[currentCard];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % sortedCityList.length);
  };

  const prevCard = () => {
    setCurrentCard(
      (prev) => (prev - 1 + cityList.length) % sortedCityList.length
    );
  };
  return (
    <div className="trip">
      <div className="trip-btn">
        <button onClick={prevCard}>&larr; Prev</button>
        <button onClick={nextCard}>Next &rarr; </button>
      </div>
      <div className="trip-items">
        <div
          className="trip-card"
          onClick={() =>
            setSelectedCity({
              city,
              startDate,
            })
          }>
          <img
            style={{ width: '200px', height: '150px' }}
            src={image}
            alt={city}
          />
          <p className="trip-city">{city}</p>
          <p className="trip-date">
            {startDate} - {endDate}
          </p>
        </div>
        <div>
          <button className="trip-add" onClick={() => setOpenForm(true)}>
            <p>+</p>
            <p>Add</p>
          </button>
          <p>you planed {sortedCityList.length} trips</p>
        </div>
      </div>
    </div>
  );
};

export default TripList;
