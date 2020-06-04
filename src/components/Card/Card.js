import React from 'react';
import './Card.css';

function Card({ title, value, delta }) {
    return (
        <div className={title === "Confirmed" ? "card card-blue"
        : title === "Active" ? "card card-red" 
        : title === "Recovered" ? "card card-green" 
        : title === "Deceased" && "card card-grey"} >
            {
                title === "Confirmed" ? <i className="fas fa-virus fa-4x"></i> 
                : title === "Active" ? <i className="fas fa-viruses fa-4x"></i> 
                : title === "Recovered" ? <i className="fas fa-shield-virus fa-4x"></i> 
                : title === "Deceased" && <i className="fas fa-skull-crossbones fa-4x"></i> 
            }
            
            <div className="card-info">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    );
}

export default Card;
