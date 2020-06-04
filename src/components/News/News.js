import React, { useEffect, useState } from 'react';
import './News.css';
import { Link } from "react-router-dom";

function News() {

  const [headlines, setHeadlines] = useState([]);
  const [headlineSummary, setHeadlineSummary] = useState([]);
  const [imgLink, setImageLink] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://stats-corona.herokuapp.com/headlines", {
      mode: 'cors', headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      setHeadlines(data['headlines']);
      setHeadlineSummary(data['headlines_summary']);
      setImageLink(data['image_link']);
      setIsLoading(false);
    })
  }, [])
  var tempData = [];
  for (let i = 0; i < headlines.length; i++) {
    let temp = [imgLink[i], headlines[i], headlineSummary[i]]
    tempData = tempData.concat([temp]);
  }
  const final = [];
  tempData.forEach((data, index) => {

    final.push(
      <div className="news-card" key={index}>
        <img className="news-img" src={data[0]} alt="news-thunmbnail" />
        <div className="news-card-body">
          <h3 className="news-card-title">{data[1]}</h3>
          <p className="news-card-text">{data[2]}</p>
        </div>
      </div>
    );
  })

  return (
    <React.Fragment>
      {
        isLoading ? <span className="loader">Loading...</span> : <React.Fragment><div className="verification-text"><i className="fas fa-check-circle"></i> &nbsp; Verified news just for you</div>
          <div className="news">
            {final}
          </div>
          <Link to="/" className="btn-link"> <i className="fas fa-arrow-left"></i> &nbsp; Home &nbsp; </Link>
        </React.Fragment>
      }
    </React.Fragment>

  );
}

export default News;
