import "./ScoreCard.css";
import { Container, Row, Col } from "react-bootstrap";
import gameStatus from "./gameStatus";

export default function ScoreCard(props) {
  const [periodStatus, timeStatus] = gameStatus(props.period, props.time);
  const [
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeAbbreviation,
    awayAbbreviation,
  ] = [
    props.teams[0],
    props.teams[1],
    props.scores[0],
    props.scores[1],
    props.teamsAbbreviation[0],
    props.teamsAbbreviation[1],
  ];
  return (
    <>
      <Container
        style={{ paddingTop: "4rem", paddingBottom: "4rem", color: "white" }}
      >
        <div className="border-container">
          <Row>
            <Col style={{ borderRight: "2px solid grey" }}>
              <img
                src={"/nba-team-logos/" + homeTeam + ".png"}
                alt={homeTeam + " logo"}
              />{" "}
              {homeAbbreviation}
            </Col>
            <Col style={{ borderRight: "2px solid grey" }}>{periodStatus}</Col>
            <Col className="teamName">
              <img
                src={"/nba-team-logos/" + awayTeam + ".png"}
                alt={awayTeam + " logo"}
              />{" "}
              {awayAbbreviation}
            </Col>
          </Row>
          <Row>
            <Col style={{ borderRight: "2px solid grey" }}>{homeScore}</Col>
            <Col style={{ borderRight: "2px solid grey" }}>{timeStatus}</Col>
            <Col>{awayScore}</Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
