import React, { useState } from 'react';
import './Map.css';   
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from 'react-tooltip';

const INDIA_TOPO_JSON = require("../../utils/map.topo.json");
const KAR_TOPO_JSON = require("../../utils/karnataka.topo.json");

const KAR_PROJECTION_CONFIG = {
    scale: window.innerWidth > 800 ? 1460 : 2800,
    center: [76.8, 15.3173]
  };

const IND_PROJECTION_CONFIG = {
  scale: window.innerWidth > 800 ? 360 : 720,
  center: [78.9629, 22.5937]
}

  const geographyStyle = {
    default: {
      outline: 'none',
    },
    hover: {
      fill: '#dd2756',
      outline: 'none',
    },
    pressed: {
      outline: 'none'
    }
  };
  
  const DEFAULT_COLOR = '#eee';

  const Legend = ({location}) => {
    return (
      <div className="legend">
        <div className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#e5f01d"}}>
          </div>
          <span>{location === "KAR" ? "0 - 10" : "1 - 1,000"}</span>
        </div>
        <div  className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#78d159"}}>
          </div>
          <span>{location === "KAR" ? "11 - 100" : "1,001 - 10,000"}</span>
        </div>
        <div  className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#17a776"}}>
          </div>
          <span>{location === "KAR" ? "101 - 500" : "10,001 - 40,000"}</span>
        </div>
        <div className="legend-item-holder">  
          <div className="legend-item" style={{backgroundColor: "#007a74"}}>
          </div>
          <span>{location === "KAR" ? "500+" : "40,000+"}</span>
        </div>
      </div>
    );
  };
  

function Map({location, data}) {
    const [tooltipContent, setTooltipContent] = useState('');

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value.toLocaleString("en-IN")}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const indColorScale = (value) => {
    value = parseInt(value);
    if(value >=0 && value <= 1000){
      return "#e5f01d";
    } else if(value > 1000 && value <= 10000){
      return "#78d159";
    } else if(value > 10000 && value <= 40000) {
      return "#17a776";
    } else if (value > 40000) {
      return "#007a74";
    } else {
      return "#eee";
    }
  }

    const karColorScale = (value) => {
    value = parseInt(value.replace(",", ""));
    if(value >=0 && value <= 10){
      return "#e5f01d";
    } else if(value > 10 && value <= 100){
      return "#78d159";
    } else if(value > 100 && value <= 500) {
      return "#17a776";
    } else if (value > 500) {
      return "#007a74";
    } else {
      return "#eee";
    }
  }

  let colorScale = location === "KAR" ? karColorScale : indColorScale;

    return (
        <div className="map">
            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
        projectionConfig={location === "KAR" ? KAR_PROJECTION_CONFIG : IND_PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={window.innerWidth > 800 ? 220 : 400}
        data-tip=""
    >
        <Geographies geography={location === "KAR" ? KAR_TOPO_JSON : INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              const current = data.find(s => s.name === geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
    </ComposableMap>
    <Legend location={location}/>
        </div>
    )  
}

export default Map;