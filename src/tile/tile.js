import React from 'react';
import './tile.css'

const Tile = (props) => {
    return (
        <div 
            className="Tile" 
            data-x={props.x} 
            data-y={props.y} >
        </div>
    )
}

export default Tile;