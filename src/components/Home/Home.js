import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from "../Card";
import Table from "../Table";
import { Link } from "react-router-dom";
import Map from "../Map";

function Home() {
  const [activeCases, setActiveCases] = useState([]);
  const [nationalData, setNationalData] = useState({});
  const [stateData, setStateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [givenLocation, setGivenLocation] = useState("KAR");
  const [districtActiveCases, setDistrictActiceCases] = useState([]);


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
        tempStateData.push({name: state.state, value: state.active});
      });
      setActiveCases(tempStateData);
      setIsLoading(false);
    })
    fetch("https://stats-corona.herokuapp.com/alldistrictdetails", {
      mode: 'cors', headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
        let tempDistrictData = [];
        data.res.forEach(district => {
          tempDistrictData.push({name: district.place, value: district.active});
        })
        setDistrictActiceCases(tempDistrictData);
    })
  }, [])

  const onLocChange = e => {
    setGivenLocation(e.target.value);
  }

  const datePresentDifference = (date) => {
    let dateArray = date.split(",");
    let extractedDate = new Date(dateArray[0] + " " +dateArray[1].split(" ")[1]);
    let t = new Date() - extractedDate;
     let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000);

  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  let lastUpdatedString = "";
  
  if(d > 0) {
    lastUpdatedString += d;
    if(d > 1 ) {
      lastUpdatedString += " days ";
    } else {
      lastUpdatedString += " day ";
    }
  } 
  if(h > 0) {
    lastUpdatedString += h;
    if(h > 1){
      lastUpdatedString += " hours and ";
    } else {
      lastUpdatedString += " hour ";
    }

  }

  if(m > 0) {
    lastUpdatedString += m;
    if(m > 1) {
      lastUpdatedString += " minutes ";
    } else {
      lastUpdatedString += " minute ";
    }
  }

  lastUpdatedString += "ago";
    return lastUpdatedString;
  }

  return (
    <div className="home">
      {
        isLoading ? <span className="loader">Loading...</span> : <React.Fragment><div className="chart-container">
          <h3 className="chart-heading">Active cases <br /> <span className="last-updated">&nbsp;&nbsp;&nbsp;&nbsp;last updated {datePresentDifference(nationalData.last_updated)}</span> </h3>
          <select className="location-dropdown" onChange = {onLocChange} defaultValue={'KAR'}>
            <option value={"IND"}>India</option>
            <option value={"KAR"}>Karnataka</option>
          </select>
          <Map data={givenLocation === "KAR" ? districtActiveCases : activeCases} location={givenLocation}/>
          <span className="text-info"><i className="fa fa-info-circle"></i>&nbsp;Click on a region to see its active cases.</span>
        </div>
        <div className="cards-container">
          <Card title={"Confirmed"} value={nationalData.confirmed_cases.toLocaleString('en-IN')}/>
          <Card title={"Active"} value={nationalData.active_cases.toLocaleString('en-IN')}/>
          <Card title={"Recovered"} value={nationalData.recovered_cases.toLocaleString('en-IN')}/>
          <Card title={"Deceased"} value={nationalData.death_cases.toLocaleString('en-IN')}/>
        </div>
        <span className="text-table-info"><i className="fa fa-info-circle"></i>&nbsp;Scroll on the table too see all details</span>
        <div className="table-container">
          <Table colHeaders={["State", "Confirmed", "Active", "Deaths", "Recovered"]} data={stateData} location={givenLocation}/>
        </div> 
        <Link to="/news" className="btn-link"> News Updates &nbsp; <i className="fas fa-arrow-right"></i></Link>
        </React.Fragment>
      }
    </div>
  );
}

export default Home;
