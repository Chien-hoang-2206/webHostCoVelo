import React, { useState } from 'react';

import QRImg from "../assets/qr/ID_1.png"
import Bike from "../assets/bike.png"
import { useDrop } from 'react-dnd';
import Bicycle from './Bicycle';

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

const Lock = ({ stt, status, id }) => {
    const [Id, setId] = useState("");

    const [show, setShow] = useState(false);
    const [isLock, setLocker] = useState({ status });
    const [board, setBoard] = useState([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.magnetic_key),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));



    const addImageToBoard = (magnetic_key) => {
        const boardL = bicycleslist.filter((bicycle) => bicycle.magnetic_key === magnetic_key);
        setBoard((prevBoard) => [...prevBoard, boardL[0]]);
    };
    function handleSubmit() {
        console.log(board[0].magnetic_key);
        alert("Đang khóa xe đạp.");
        setLocker(!isLock);
    }
    function handleUnlocl() {
        alert("Đang mở khóa xe đạp.");
        setLocker(!isLock);
    }

    function handleShowQR() {
        setShow(!show);
    }
    let image = null;
    if (board.length > 0) {
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