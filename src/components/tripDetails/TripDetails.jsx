import CountdownTimer from '../../counter/CountDownTimer';
import './tripDetails.css';

const TripDetails = ({ selectedCity, todayData, loading, error }) => {
  const icon = `/icons/${todayData.icon}.svg`;

  if (error !== null) {
    return (
      <div className="details-container">
        <p style={{ color: 'red' }}>Something gone wrong </p>
      </div>
    );
  }

  return (
    <div className="details-container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="details-content">
          <h2 className="details-day">{todayData.day}</h2>
          <div className="details-temp">
            <img width={50} height={50} src={icon} alt="Weather Icon" />
            <span>{todayData.temperature}˚C</span>
          </div>
          <p className="details-city">{todayData.city}</p>
          <CountdownTimer startDate={selectedCity.startDate} />
        </div>
      )}
    </div>
  );
};

export default TripDetails;
