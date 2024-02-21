import {
  AuthDetails,
  SearchBar,
  TripList,
  TripDetails,
  AddTripModal,
  WeekWeather,
} from '../../components';
import { useApp } from '../../hooks/useApp';
import './home.css';

const Home = () => {
  const {
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
    loading,
    error,
  } = useApp();

  return (
    <>
      <div className="main-content">
        <div className="main-left-content">
          <div className="home-title-container">
            <h1 className="home-title">Weather forecast</h1>
            <AuthDetails />
          </div>
          <SearchBar setSearchTrips={setSearchTrips} searchTrip={searchTrip} />
          <TripList
            cityList={cityList}
            searchTrip={searchTrip}
            setSelectedCity={setSelectedCity}
            setOpenForm={setOpenForm}
          />
          <WeekWeather
            weekWeather={weekWeather}
            loading={loading}
            error={error}
          />
        </div>
        <TripDetails
          selectedCity={selectedCity}
          todayData={todayData}
          loading={loading}
          error={error}
        />
      </div>
      {openform && (
        <AddTripModal setCityList={setCityList} setOpenForm={setOpenForm} />
      )}
    </>
  );
};

export default Home;
