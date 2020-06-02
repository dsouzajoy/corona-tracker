import React, { useEffect, useState } from 'react';
import './Home.css';
import { Chart } from "react-google-charts";
import Card from "../Card";

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
      console.log(tempStateData);
      setActiveCases(tempStateData);
      setIsLoading(false);
    })
  }, [])

  return (
    <div className="home">
      {
        isLoading ? <span>Loading...</span> : <React.Fragment><div className="chart-container">
          <h3 className="chart-heading">State wise active cases</h3>
          <Chart
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
          <span className="text-sorry"><i className="fas fa-heart-broken"></i>&nbsp;we regret the discrepancies in visualizing certain states/union territories we are working on his issue  </span>
          <span className="text-info"><i className="fa fa-info-circle"></i>&nbsp;Click on a state to see its active cases.</span>
        </div>
        <div className="cards-container">
          {console.log(nationalData)}
          <Card title={"Total Cases"} value={nationalData.confirmed_cases}/>
          <Card title={"Active Cases"} value={nationalData.active_cases}/>
          <Card title={"Recovered"} value={nationalData.recovered_cases}/>
          <Card title={"Deceased"} value={nationalData.death_cases}/>
        </div>
        </React.Fragment>
      }
    </div>
  );
}

export default Home;
