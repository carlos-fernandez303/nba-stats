import { useState, useEffect } from "react";
import { Accordion, Row, Col, Button } from "react-bootstrap";
export default function Teams() {
  const [team, setTeam] = useState(null);
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    fetch(
      "http://data.nba.net/data/10s/prod/v1/current/standings_conference.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => setToggle(0)}>Eastern Conference</Button>
        </Col>
        <Col>
          <Button onClick={() => setToggle(1)}>Western Conference</Button>
        </Col>
      </Row>
      <Row>
        {toggle === 0 && <Col>These are eastern conference standings</Col>}
        {toggle === 1 && <Col>These are Western Conference Standings</Col>}
      </Row>
    </>
  );
}
