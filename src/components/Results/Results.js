import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Results.css";

export default function Results(props) {
  const [headshot, setHeadshot] = useState(null);
  const [player, setPlayer] = useState(null);
  const { id, name, team } = useParams();

  let [firstName, lastName] = name.split("_");
  const teamName = team.split("_").join(" ");

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
      });
  }, [firstName, lastName]);

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setPlayer(data.data);
      });
  }, [id]);

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getBirthday = (dateString) => {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);

    var date = new Date(year, month - 1, day);
    return date.toString().split(" ").slice(0, 4);
  };

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

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
          <Col className="name-stat-col" xl={6} lg={6} xs={12}>
            <Row className="header-stats">
              {teamName} {" | #"}
              {headshot.jersey}
              {" | "}
              {headshot.teamSitesOnly.posFull}
            </Row>
            <Row className="player-name">
              {firstName} {lastName}
            </Row>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {player !== [] && player !== null && headshot ? (
        <>
          <Row className="stat-averages">
            <Col
              className="base-stat"
              style={{ borderRight: "1px solid white" }}
            >
              <Row className="stat-title" style={{ fontSize: "2rem" }}>
                PPG
              </Row>
              <Row className="stat-value">{player[0] ? player[0].pts : 0}</Row>
            </Col>
            <Col
              className="base-stat"
              style={{ borderRight: "1px solid white" }}
            >
              <Row className="stat-title" style={{ fontSize: "2rem" }}>
                RPG
              </Row>
              <Row className="stat-value">{player[0] ? player[0].reb : 0}</Row>
            </Col>
            <Col
              className="base-stat"
              style={{ borderRight: "1px solid white" }}
            >
              <Row className="stat-title" style={{ fontSize: "2rem" }}>
                APG
              </Row>
              <Row className="stat-value">{player[0] ? player[0].ast : 0}</Row>
            </Col>
            <Col
              className="base-stat"
              style={{ borderRight: "1px solid white" }}
            >
              <Row className="stat-title" style={{ fontSize: "2rem" }}>
                BPG
              </Row>
              <Row className="stat-value">{player[0] ? player[0].blk : 0}</Row>
            </Col>
            <Col
              className="base-stat"
              style={{ borderRight: "1px solid white" }}
            >
              <Row className="stat-title" style={{ fontSize: "2rem" }}>
                SPG
              </Row>
              <Row className="stat-value">{player[0] ? player.stl : 0}</Row>
            </Col>
          </Row>

          <Row className="player-background">
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Height</Row>
              <Row className="background-value">
                {`${headshot.heightFeet}'${headshot.heightInches}" (${headshot.heightMeters}m)`}
              </Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Weight</Row>
              <Row className="background-value">{`${headshot.weightPounds}lb (${headshot.weightKilograms}kg)`}</Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Country</Row>
              <Row className="background-value">{headshot.country}</Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Last Attended</Row>
              <Row className="background-value">
                {truncate(headshot.collegeName, 10)}
              </Row>
            </Col>
          </Row>
          <Row className="player-background">
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Age</Row>
              <Row className="background-value">
                {getAge(headshot.dateOfBirthUTC.split("-").join(" "))}
              </Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Birthdate</Row>
              <Row className="background-value">
                {getBirthday(headshot.dateOfBirthUTC.split("-").join(" "))[1] +
                  " " +
                  getBirthday(headshot.dateOfBirthUTC.split("-").join(" "))[2] +
                  ", " +
                  getBirthday(headshot.dateOfBirthUTC.split("-").join(" "))[3]}
              </Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Draft</Row>
              <Row className="background-value draft-value">{`${headshot.draft.seasonYear} R${headshot.draft.roundNum} Pick ${headshot.draft.pickNum}`}</Row>
            </Col>
            <Col
              className="background-stat"
              style={{
                borderTop: "1px solid white",
                borderRight: "1px solid white",
              }}
            >
              <Row className="background-title">Experience</Row>
              <Row className="background-value">{`${headshot.yearsPro} years`}</Row>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}

      <Row></Row>
    </Container>
  );
}
