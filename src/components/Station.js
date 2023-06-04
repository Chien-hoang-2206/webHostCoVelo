import React, { useEffect, useState } from 'react';
import Lock from './lock';


const Station = (props) => {
    const idStation = props.idStation;
    const [listLock, setListLock] = useState("");
    

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        const response = await fetch(`https://covelo.onrender.com/station/${idStation}`);
        const data = await response.json();
        setListLock(data.lockers);
    }

    const renderLocker = listLock && listLock.map((locker, index) => {
        return (
            <Lock key={index} stt={index+1} status={locker.is_locked} id={locker.id} />
        );
    });

    return (
        <div className="station">
            <div className="label-station">
                <label className='label-text'>Trạm {props.location}</label>
            </div>
            <div className="bicycle-station">
            {renderLocker}
            </div>
        </div>
    );

};

export default Station;