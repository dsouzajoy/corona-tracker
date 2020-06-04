import React from 'react';
import './Table.css';

function Table({colHeaders, data}) {
    return (
        <table className="table">
            <thead>
            <tr>
                {colHeaders.map((header, index) => <th key={index}>{header}</th>)}
            </tr>
            </thead>
            <tbody>      
                {data.map((state, index) => <tr key={index}>
                    <td>{state.state === "IN-UT" ? "Uttarakhand" : state.state === "IN-AN" ? "Andaman and Nicobar" : state.state === "Orissa" ? "Odisha" : state.state}</td>
                    <td>{state.confirmed.toLocaleString('en-IN')}</td>
                    <td>{state.active.toLocaleString('en-IN')}</td>
                    <td>{state.deaths.toLocaleString('en-IN')}</td>
                    <td>{state.recovered.toLocaleString('en-IN')}</td>
                </tr>)}        
            </tbody>
        </table>
    )
}

export default Table;