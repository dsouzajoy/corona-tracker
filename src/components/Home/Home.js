import React, { useEffect, useState } from 'react';
import './Home.css';
import { Chart } from "react-google-charts";
import Card from "../Card";
import Table from "../Table";
import { Link } from "react-router-dom";

function Home() {
  const [activeCases, setActiveCases] = useState([["State", "Cases", "Display"]]);
  const [nationalData, setNationalData] = useState({});
  const [stateData, setStateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    let tempStateData = [["State", "Active Cases"]];
    fetch("https://stats-corona.herokuapp.com/all", {
      mode: 'cors', headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      setNationalData(data[0]);
      setStateData(data[1].state_data);
      data[1].state_data.forEach(state => {
        if (state.state === "Odisha") {
          state.state = "Orissa";
        } else if (state.state === "Uttarakhand") {
          state.state = "IN-UT"
        } else if (state.state === "Andaman and Nicobar") {
          state.state = "IN-AN"
        }
        tempStateData.push([state.state, state.active]);
      });
      setActiveCases(tempStateData);
      setIsLoading(false);
    })
  }, [])

  return (
    <div className="home">
      {
        isLoading ? <span className="loader">Loading...</span> : <React.Fragment><div className="chart-container">
          <h3 className="chart-heading">State wise active cases</h3>
          <Chart
            loader={<span>Loading...</span>}
            width={window.innerWidth < 600 ? window.innerWidth : 600}
            chartType="GeoChart"
            data={activeCases}
            rootProps={{ 'data-testid': '1' }}
            var options={{
              enableRegionInteractivity: true,
              domain: 'IN',
              region: 'IN', // India 
              displayMode: 'regions', 
              resolution: 'provinces', 
              colorAxis: {
                colors: ['#fff', '#ffac7f', '#ff7a33', '#ff5900', '#cc4700']
              },
              backgroundColor: 'transparent',
              datalessRegionColor: '#123456',
              defaultColor: '#ccc',
            }}
          />
          <span className="text-sorry"><i className="fas fa-heart-broken"></i>&nbsp;we regret the discrepancies in visualizing the borders of certain states/union territories we are working on this issue</span>
          <span className="text-info"><i className="fa fa-info-circle"></i>&nbsp;Click on a state to see its active cases.</span>
        </div>
        <div className="cards-container">
          <Card title={"Confirmed"} value={nationalData.confirmed_cases.toLocaleString('en-IN')}/>
          <Card title={"Active"} value={nationalData.active_cases.toLocaleString('en-IN')}/>
          <Card title={"Recovered"} value={nationalData.recovered_cases.toLocaleString('en-IN')}/>
          <Card title={"Deceased"} value={nationalData.death_cases.toLocaleString('en-IN')}/>
        </div>
        <span className="text-table-info"><i className="fa fa-info-circle"></i>&nbsp;Scroll on the table too see all details</span>
        <div className="table-container">
          <Table colHeaders={["State", "Confirmed", "Active", "Deaths", "Recovered"]} data={stateData}/>
        </div> 
        <Link to="/news" className="btn-link"> News Updates &nbsp; <i class="fas fa-arrow-right"></i></Link>
        </React.Fragment>
      }
    </div>
  );
}

export default Home;
