
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import './News.css';
import { Link } from "react-router-dom";

function News() {

  const [headlines, setHeadlines] = useState([]);
  const [headlineSummary, setHeadlineSummary] = useState([]);
  const [imgLink, setImageLink] = useState({});

  useEffect(() => {
    fetch("https://stats-corona.herokuapp.com/headlines", {
      mode: 'cors', headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      setHeadlines(data['headlines']);
      setHeadlineSummary(data['headlines_summary']);
      setImageLink(data['image_link']);

    })
  }, [])
  var tempData = [];
  for (let i = 0; i < headlines.length; i++) {
    let temp = [imgLink[i], headlines[i], headlineSummary[i]]
    tempData = tempData.concat([temp]);
  }
  const final = [];
  tempData.forEach(data => {

    final.push(
    <div class="card cards">
      <Row>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <img src={data[0]} alt="tumbnail" />
        </div>
        <div className="col-sm-12 col-md-8">
          <div class="card-body">
            <h3 class="card-title">{data[1]}</h3>
            <p class="card-text">{data[2]}</p>
          </div>
        </div>
      </Row>
    </div>
    );
  })

  return (
    <React.Fragment>
      <Container>
        {final}
        <Link to="/" className="btn-link"> <i class="fas fa-arrow-left"></i> &nbsp; Back to Home &nbsp; </Link>
      </Container>
    </React.Fragment>
  );
}

export default News;
