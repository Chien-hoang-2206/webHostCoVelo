import React, { useEffect, useState } from 'react';
import './App.css';
import Station from './components/Station';
import Bicycle from './components/Bicycle';

function App() {
  const [listStation, setListStation] = useState([]);
  const [usingRentalBicycle, setusingRentalBicycle] = useState([]);

  useEffect(() => {
    fetchDataListStatio();
    fetchDataUsingListBicycle();
  }, []);

  async function fetchDataListStatio() {
    try {
      const response = await fetch('https://covelo.onrender.com/station/list/');
      const data = await response.json();
      if (data) {
        setListStation(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchDataUsingListBicycle() {
    try {
      const response = await fetch('https://covelo.onrender.com/bicycle/list/');
      const data = await response.json();
      if (data) {
        setusingRentalBicycle(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const deleteBicycleUsing = (bicycleID) => {
    console.log("🚀 ----------------------------------------------------------------🚀")
    console.log("🚀 ~ file: App.js:41 ~ deleteBicycleUsing ~ bicycleID:", bicycleID)
    console.log("🚀 ----------------------------------------------------------------🚀")

    const updateBycicleUsing = usingRentalBicycle.filter(bicycle => bicycle.id !== bicycleID);
    setusingRentalBicycle(updateBycicleUsing);
  };

  return (

    <div className="container">

      <div className="station-container">

        <h1 className="">Trạm Xe</h1>

        {listStation.map((station, index) => (
          <Station key={index} idStation={station.id} location={station.location} usingRentalBicycle={usingRentalBicycle} deleteBicycleUsing={deleteBicycleUsing} />
        ))}

      </div>
      <div className="using-bicyle-container">
        <div className="using-bicycle">
          <div className="label-using">
            <label className='label-text'>Xe đang sử dụng</label>
          </div>
          {/* magnetic_key={bicycle.magnetic_key}  */}
          <div className="using-content">
            {usingRentalBicycle.map((bicycle, index) => (
              <Bicycle key={index} stt={index + 1} magnetic_key={bicycle.magnetic_key} id={bicycle.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;