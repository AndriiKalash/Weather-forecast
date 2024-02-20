import React from 'react';
import './searchBar.css';

const SearchBar = ({ setSearchTrips, searchTrip }) => {
  const handleSearch = (e) => {
    setSearchTrips(e.target.value);
  };
  const clearSearch = () => setSearchTrips('');

  return (
    <div className="search">
      <input
        onChange={handleSearch}
        style={{ height: 20, padding: 3 }}
        value={searchTrip}
        type="text"
        name="search"
        id="search"
        placeholder="Search trip"
      />
      {searchTrip && <button onClick={clearSearch}>X</button>}
    </div>
  );
};

export default SearchBar;
