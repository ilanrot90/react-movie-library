import React from 'react';
import './card.css';

const icon = {
    edit: 'M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z',
    trashA: 'M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z',
    trashB: 'M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z'
}
export const Subtext = ({ movie, openModal }) => {
    const { Genre, imdbID, Year, Director, Runtime } = movie;
    return (
        <div className= "subtext">
            <p>Released at { Year }</p>
            <p>By {Director}</p>
            <p>Runtime: {Runtime}</p>
            <p>{Genre}</p>

            <button className="edit__btn btn-round" onClick= { () => openModal(imdbID, 'modal') }>
                <svg viewBox="0 0 32 32" className="edit__icon icon">
                    <path d={icon.edit}></path>
                </svg>
            </button>
            <button className="trash__btn btn-round" onClick= { () => openModal(imdbID, 'confirm') }>
                <svg viewBox="0 0 32 32" className="trash__icon icon">
                    <path d={icon.trashA}></path>
                    <path d={icon.trashB}></path>
                </svg>
            </button>

            
        </div>
    )
}