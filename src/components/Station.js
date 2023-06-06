import React, { useEffect, useState } from 'react';
import Lock from './lock';


const Station = ({ idStation, location, deleteBicycleUsing, usingRentalBicycle }) => {
    const [listLock, setListLock] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchData();
    },[]);

    const deleteBicycleUsingCallBack = (bicycleID) => {
        deleteBicycleUsing(bicycleID);
    };

    async function fetchData() {
        const response = await fetch(`https://covelo.onrender.com/station/${idStation}`);
        const data = await response.json();
        setListLock(data.lockers);

    }

    const renderLocker = listLock && listLock.map((locker, index) => {
        return (
            <Lock key={index} stt={index + 1} id={locker.id} idbike={locker.bike} idStation={idStation} status={locker.is_locked} usingRentalBicycle={usingRentalBicycle} deleteBicycleUsing={deleteBicycleUsingCallBack} />
        );
    });

    return (
        <div className="station">
            {console.log(listLock) }
            <div className="label-station">
                <label className='label-text'>Trạm {location}</label>
            </div>
            <div className="bicycle-station">
                {renderLocker}
            </div>
        </div>
    );

};

export default Station;