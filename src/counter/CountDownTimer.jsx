import React, { useState, useEffect } from 'react';
import './counter.css';
import { calculateTimeRemaining } from '../services/timer';

const CountdownTimer = ({ startDate }) => {
  const targetDate = new Date(`${startDate}T23:59:59`);

  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(() => calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  if (!startDate) {
    return null;
  }

  return (
    <div className="counter-container">
      <div className="counter-element">
        <p className="counter-number">{timeRemaining.days}</p>
        <p className="counter-description">days</p>
      </div>
      <div className="counter-element">
        <p className="counter-number">{timeRemaining.hours}</p>
        <p className="counter-description">hours</p>
      </div>
      <div className="counter-element">
        <p className="counter-number">{timeRemaining.minutes}</p>
        <p className="counter-description">minutes</p>
      </div>
      <div className="counter-element">
        <p className="counter-number">{timeRemaining.seconds}</p>
        <p className="counter-description">seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
