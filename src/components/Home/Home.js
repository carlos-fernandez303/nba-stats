import "./Home.css";
import { useEffect, useState } from "react";
import ScoreCard from "../ScoreCard/ScoreCard";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
const Home = () => {
  const currentDate = new Date();
  const [gameData, setGameData] = useState(null);
  const [date, setDate] = useState([
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  ]);

  const [formDate, setFormDate] = useState(new Date());

  useEffect(() => {
    fetch(
      // prettier-ignore
      `https://www.balldontlie.io/api/v1/games?dates[]=${date[0]}-${date[1]}-${date[2]}`
    )
      .then((response) => response.json())
      .then(
        (games) => {
          console.log(games);
          setGameData(games.data);
        },
        (error) => {
          alert(error);
        }
      );
  }, [date]);

  const handleChange = (date) => {
    setFormDate(date);
    let gameDate = formDate.toISOString().split("T")[0].split("-");
    setDate([gameDate[0], gameDate[1], gameDate[2]]);
    console.log(date);
  };

  return (
    <Container>
      <Row>
        <Col className="choose-date">
          <h1>Missed the games the other day?</h1>
          <h2>Choose a date: </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="text-center">
              <DatePicker
                className="date-picker"
                value={formDate}
                onChange={(date) => handleChange(date)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="games-header">
          Games - {date[1]}/{date[2]}/{date[0]}
        </Col>
      </Row>

      {gameData
        ? gameData.map((game) => (
            <ScoreCard
              key={game.id}
              teams={[game.home_team.full_name, game.visitor_team.full_name]}
              teamsAbbreviation={[
                game.home_team.abbreviation,
                game.visitor_team.abbreviation,
              ]}
              period={game.period}
              scores={[game.home_team_score, game.visitor_team_score]}
              time={game.time}
            />
          ))
        : ""}
    </Container>
  );
};

export default Home;
