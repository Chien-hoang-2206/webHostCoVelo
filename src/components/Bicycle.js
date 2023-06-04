import React from 'react'
import Bike from "../assets/bike.png"
import { useDrag } from 'react-dnd'
function Bicycle({ magnetic_key, id, stt }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { magnetic_key: magnetic_key },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    return (
        <div className='bicycle-using'>
            <h1  >{stt}</h1>
            <img
                ref={drag}
                className='img-using-bicycle'
                src={Bike} alt="s"
                style={{ border: isDragging ? "5px solid pink" : "0px" }}
            />
        </div>
    )
}

export default Bicycle
