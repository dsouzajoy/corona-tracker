import React, { useState } from 'react';
import './Map.css';   
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
const INDIA_TOPO_JSON = require("../../utils/map.topo.json");
const PROJECTION_CONFIG = {
    scale: window.innerWidth > 800 ? 360 : 720,
    center: [78.9629, 22.5937]
  };

  const geographyStyle = {
    default: {
      outline: 'none'
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

  const Legend = () => {
    return (
      <div className="legend">
        <div className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#e5f01d"}}>
          </div>
          <span>1 - 1,000</span>
        </div>
        <div  className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#78d159"}}>
          </div>
          <span>1,001 - 10,000</span>
        </div>
        <div  className="legend-item-holder">
          <div className="legend-item" style={{backgroundColor: "#17a776"}}>
          </div>
          <span>10,001 - 40,000</span>
        </div>
        <div className="legend-item-holder">  
          <div className="legend-item" style={{backgroundColor: "#007a74"}}>
          </div>
          <span>40,000+</span>
        </div>
      </div>
    );
  };
  

function Map({data}) {
    const [tooltipContent, setTooltipContent] = useState('');

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value.toLocaleString('en-IN')}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const colorScale = (value) => {
    value = parseInt(value);
    if(value >=1 && value <= 1000){
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

    return (
        <div className="map">
            <ReactTooltip>{tooltipContent}</ReactTooltip>
            <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={window.innerWidth > 800 ? 220 : 400}
        data-tip=""
    >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              const current = data.find(s => s.state === geo.properties.name);
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
    <Legend/>
        </div>
    )  
}

export default Map;