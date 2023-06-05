import React, { useState } from 'react';

import QRImg from "../assets/qr/ID_1.png"
import Bike from "../assets/bike.png"
import { useDrop } from 'react-dnd';

const Lock = ({ stt, status,id, idStation, usingRentalBicycle,deleteBicycleUsing  }) => {

    // const listBicycle = usingRentalBicycle;
    const [show, setShow] = useState(false);
    const [isLock, setLocker] = useState(status);
    const [showbicycle, setShowBicycle] = useState(false);

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    async function fetchDataEndTental(id) {
        try {
            const url = `https://covelo.onrender.com/rental/end/${id}`;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "end_station_id": idStation
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if (data) {
                console.log("🚀 --------------------------------------------------------------🚀");
                console.log("🚀 ~ file: lock.js:30 ~ fetchDataEndTental ~ data:", data);
                console.log("🚀 --------------------------------------------------------------🚀");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async function fetchDataBicycleMagneticKey(magnetic_key) {
        try {
            const url = `https://covelo.onrender.com/bicycle/update/${magnetic_key}`;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "locker": id
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if (data) {
                console.log("🚀 --------------------------------------------------------------🚀");
                console.log("🚀 ~ file: lock.js:30 ~ fetchDataBicycleMagneticKey ~ data:", data);
                console.log("🚀 --------------------------------------------------------------🚀");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const addImageToBoard = (item) => {
        const id = item.id;
        const magnetic_key = item.magnetic_key;
        console.log(id, magnetic_key);
        console.log("🚀 -----------------------------------------------------------------🚀")
        console.log("🚀 ~ file: lock.js:50 ~ fetchDataEndTental ~ idStation:", idStation)
        console.log("🚀 -----------------------------------------------------------------🚀")
        
        // fetchDataEndTental(id);
        // fetchDataBicycleMagneticKey(magnetic_key);
        // setShowBicycle(true);
        deleteBicycleUsing(id);
    };

    function handleSubmit() {
        alert("Đang khóa xe đạp.");
        setLocker(!isLock);
    }
    function handleUnlocl() {
        handleShowQR();
        // alert("Đang mở khóa xe đạp.");
    }

    function handleShowQR() {
        setShow(!show);
    }

    let image = null;

    if (showbicycle) {
        image = <img src={Bike} alt="s" className="bicycle-lock" />;
    }

    return (
        <div className="bicycles" >
            {isLock ? (
                <>
                    <div className="stt-text">
                        <h2> {stt} </h2>
                    </div>
                    <div className='bycle-img' onClick={handleShowQR}>
                        <img src={Bike} alt="qr-code" className="qr-img" />
                    </div>

                    <div className={`qrcode ${show ? 'active' : ''}`} onMouseLeave={handleShowQR} >
                        <img src={QRImg} alt="qr-code" className="qr-img" />
                    </div>

                    <button className='button-icon-lock' onClick={handleUnlocl}>
                        <img className='icon-lock' src='lock.png' alt='' />
                    </button>

                </>
            ) : (
                <>
                    <div className="stt-text">
                        <h2> {stt} </h2>
                    </div>

                    <div className="locker_empty" ref={drop} >
                        {image}
                    </div>
                    <button className='button-icon-unlock' onClick={handleSubmit}>
                        <img className='icon-lock' src='unlocked.png' alt='' />
                    </button>

                </>
            )
            }

        </div>
    );
};

export default Lock;