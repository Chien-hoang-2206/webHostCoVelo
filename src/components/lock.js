import React, { useContext, useState } from 'react';

import QRImg from "../assets/qr/ID_1.png"
import Bike from "../assets/bike.png"
import { useDrop } from 'react-dnd';
import QR_1 from "../assets/qr/ID_1.png"
import QR_2 from "../assets/qr/ID_2.png"
import QR_3 from "../assets/qr/ID_3.png"
import QR_4 from "../assets/qr/ID_4.png"
import QR_5 from "../assets/qr/ID_5.png"
import QR_6 from "../assets/qr/ID_6.png"
import QR_7 from "../assets/qr/ID_7.png"
import QR_8 from "../assets/qr/ID_8.png"
import QR_9 from "../assets/qr/ID_9.png"
import QR_10 from "../assets/qr/ID_10.png"
import QR_11 from "../assets/qr/ID_11.png"
import QR_12 from "../assets/qr/ID_12.png"
import QR_13 from "../assets/qr/ID_13.png"
import QR_14 from "../assets/qr/ID_14.png"
import QR_15 from "../assets/qr/ID_15.png"
import QR_16 from "../assets/qr/ID_16.png"
import QR_17 from "../assets/qr/ID_17.png"
import QR_18 from "../assets/qr/ID_18.png"
import QR_19 from "../assets/qr/ID_19.png"
import QR_20 from "../assets/qr/ID_20.png"
import QR_21 from "../assets/qr/ID_21.png"
import QR_22 from "../assets/qr/ID_22.png"
import QR_23 from "../assets/qr/ID_23.png"
import QR_24 from "../assets/qr/ID_24.png"
import QR_25 from "../assets/qr/ID_25.png"
import QR_26 from "../assets/qr/ID_26.png"
import QR_27 from "../assets/qr/ID_27.png"
import QR_28 from "../assets/qr/ID_28.png"
import QR_29 from "../assets/qr/ID_29.png"
import QR_30 from "../assets/qr/ID_30.png"
import axios from 'axios';
import ReloadContext from '../context/ReloadContext';

const Lock = ({  status, id, idbike, idStation, usingRentalBicycle, deleteBicycleUsing }) => {
    // const listBicycle = usingRentalBicycle;
    const [show, setShow] = useState(false);
    const [isLock, setLocker] = useState(status);
    // const [reload, setReload] = useContext(ReloadContext);

    const [showbicycle, setShowBicycle] = useState(false);
    
    const qrImages = {};
    for (let i = 1; i <= 30; i++) {
        qrImages[i] = require(`../assets/qr/ID_${i}.png`);
    }

    const QRIMG = qrImages[idbike];


    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    async function fetchDataEndTental(id) {
        try {
            await axios
                .patch(`https://covelo.onrender.com/rental/end/${id}`, {
                    "end_station_id": idStation
                })
                .then((response) => {
                    console.log("🚀 --------------------------------------------------🚀")
                    console.log("🚀 ~ file: lock.js:34 ~ .then ~ response:", response.data)
                    console.log("🚀 --------------------------------------------------🚀")
                })
                .catch((error) => {
                    console.log("🚀 ---------------------------------------------------------🚀")
                    console.log("🚀 ~ file: lock.js:39 ~ fetchDataEndTental ~ error:", error)
                    console.log("🚀 ---------------------------------------------------------🚀")
                });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async function fetchDataBicycleMagneticKey(magnetic_key) {
        try {
            await axios
                .patch(`https://covelo.onrender.com/bicycle/update/${magnetic_key}`, {
                    "locker": id
                })
                .then((response) => {
                    console.log("🚀 --------------------------------------------------🚀")
                    console.log("🚀 ~ file: lock.js:34 ~ .then ~ response:", response.data)
                    console.log("🚀 --------------------------------------------------🚀")
                })
                .catch((error) => {
                    console.log("🚀 ---------------------------------------------------------🚀")
                    console.log("🚀 ~ file: lock.js:39 ~ fetchDataEndTental ~ error:", error)
                    console.log("🚀 ---------------------------------------------------------🚀")
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const addImageToBoard = (item) => {
        const id = item.id;
        const magnetic_key = item.magnetic_key;

        console.log("🚀 -------------------------------------------------🚀")
        console.log("🚀 ~ file: lock.js:107 ~ addImageToBoard ~ id,magnetic_key:", id,magnetic_key)
        console.log("🚀 -------------------------------------------------🚀")
        setShowBicycle(true);
        fetchDataEndTental(id);
        fetchDataBicycleMagneticKey(magnetic_key);
        deleteBicycleUsing(id);
        setLocker(true);
        // setReload(true);
    };

    function handleSubmit() {
        alert("Đang khóa xe đạp.");
        setLocker(!isLock);
    }
    function handleUnlocl() {
        handleShowQR();
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
                        <h2> {idbike} </h2>
                    </div>
                    <div className='bycle-img' onClick={handleShowQR}>
                        <img src={Bike} alt="qr-code" className="qr-img" />
                    </div>

                    <div className={`qrcode ${show ? 'active' : ''}`} onMouseLeave={handleShowQR} >
                        <img src={QRIMG} alt="qr-code" className="qr-img" />
                    </div>

                    <button className='button-icon-lock' onClick={handleUnlocl}>
                        <img className='icon-lock' src='lock.png' alt='' />
                    </button>

                </>
            ) : (
                <>
                    <div className="stt-text">
                        <h2> _ </h2>
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