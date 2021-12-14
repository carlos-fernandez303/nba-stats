import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Results.css";

export default function Results(props) {
  const [headshot, setHeadshot] = useState(null);
  const [player, setPlayer] = useState(null);
  const { id, name, team } = useParams();

  const [firstName, lastName] = name.split("-");
  const teamName = team.split("-").join(" ");

  useEffect(() => {
    fetch("http://data.nba.net/data/10s/prod/v1/2021/players.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.league.standard);
        setHeadshot(
          data.league.standard.find(
            (player) =>
              player.firstName === firstName && player.lastName === lastName
          )
        );
        console.log(headshot);
      });
  }, [firstName, lastName]);

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlayer(data.data);
      });
  }, [id]);

  return (
    <Container>
      <Row>
        <Col className="stat-col">
          {headshot ? (
            <img
              className="nba-headshot"
              alt="nba-headshot"
              src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${headshot.personId}.png`}
            ></img>
          ) : (
            ""
          )}
        </Col>
        {headshot ? (
          <Col style={{ textAlign: "left" }}>
            <Row className="header-stats">
              {teamName} {" | #"}
              {headshot.jersey}
              {" | "}
              {headshot.pos}
            </Row>
            <Row className="player-name">
              {firstName} {lastName}
            </Row>
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row>
        <Col className="test">PPG</Col>
      </Row>
    </Container>
  );
}
