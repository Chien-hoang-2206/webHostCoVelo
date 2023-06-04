import React, { useEffect, useState } from 'react';
import './App.css';
import Station from './components/Station';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Bicycle from './components/Bicycle';


const bicycleslist = [
  {
    "id": 1,
    "magnetic_key": 11111,
    "location": "BK"
  },
  {
    "id": 2,
    "magnetic_key": 11112,
    "location": "NN"
  },
  {
    "id": 3,
    "magnetic_key": 11113,
    "location": "C"
  },
  {
    "id": 4,
    "magnetic_key": 11114,
    "location": "D"
  },
  {
    "id": 5,
    "magnetic_key": 11115,
    "location": "E"
  },
  {
    "id": 6,
    "magnetic_key": 11116,
    "location": "F"
  },
  {

    "id": 7,
    "magnetic_key": 11117,
    "location": "P"
  }
]
function App() {
  const [listStation, setListStation] = useState([]);
  const [usingRentalBicycle, setusingRentalBicycle] = useState([]);


  useEffect(() => {
    fetchData();
    fetchDataUsingListBicycle();
  }, []);

  async function fetchData() {
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
        // setusingRentalBicycle(data);
        setusingRentalBicycle(bicycleslist);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (

    <div className="container">

      <div className="station-container">


        <h1 className="">Trạm Xe</h1>

        {listStation.map((station, index) => (
          <Station key={index} idStation={station.id} location={station.location} />
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