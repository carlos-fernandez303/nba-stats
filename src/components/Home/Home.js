import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScoreCard from "../ScoreCard/ScoreCard";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [gameData, setGameData] = useState(null);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const date = new Date();
    setDate([date.getMonth() + 1, date.getDate(), date.getFullYear()]);
    fetch(
      // prettier-ignore
      `https://www.balldontlie.io/api/v1/games?dates[]=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
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
  }, []);
  return (
    <Container>
      <Row>
        <Col className="games-header">
          Today's Games ({date[0]}/{date[1]}/{date[2]})
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
