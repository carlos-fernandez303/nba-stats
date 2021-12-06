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
    <Container
      style={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        maxWidth: "50rem",
      }}
    >
      <Row className="border-container justify-content-md-center">
        <Col
          xs
          style={{
            borderRight: "2px solid grey",
          }}
        >
          <img
            src={"/nba-team-logos/" + homeTeam + ".png"}
            alt={homeTeam + " logo"}
          />
          <div>{homeAbbreviation}</div>
          <div>{homeScore}</div>
        </Col>
        <Col xs style={{ borderRight: "2px solid grey" }}>
          <div>{periodStatus}</div>
          <div>{timeStatus}</div>
        </Col>
        <Col xs>
          <img
            src={"/nba-team-logos/" + awayTeam + ".png"}
            alt={awayTeam + " logo"}
          />
          <div>{awayAbbreviation}</div>
          <div>{awayScore}</div>
        </Col>
      </Row>
    </Container>
  );
}
