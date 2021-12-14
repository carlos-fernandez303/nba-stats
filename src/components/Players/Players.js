import "./Players.css";
import { useEffect, useState, useRef } from "react";
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([{ id: null }]);
  const [playerName, setPlayerName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data.data);
          setIsLoading(false);
          setPlayers(data.data);
        },
        (error) => {
          alert(error);
        }
      );
    return () => {
      setPlayers([]);
    };
  }, [playerName]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (name) => {
    if (name.length <= 2) {
      setIsLoading(true);
    }
    if (name.length > 2 && name.length <= 20) {
      setPlayerName(name);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8} lg={3} xl={5} className="mx-auto">
          <h1>
            Interested in a specific player's season averages? 📊
            <br />
            <br />
          </h1>

          <h2>Enter a name below to find out!</h2>
        </Col>
      </Row>
      <Row>
        <Col md={8} lg={3} xl={5} className="mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <h3>First and last name</h3>

              <InputGroup
                value={playerName}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => {
                  setTimeout(() => {
                    setPlayers([]);
                  }, 100);
                }}
              >
                <FormControl
                  required
                  placeholder="e.g. 'Lebron James'"
                  aria-label="Player name"
                  aria-describedby="basic-addon2"
                  style={{
                    border: "1px solid black",
                    height: "5rem",
                    fontSize: "2rem",
                  }}
                />
                {players.length === 0 || players[0].id == null ? (
                  <Button variant="dark" size="lg">
                    Submit
                  </Button>
                ) : (
                  <Link
                    to={`${players[0].first_name}-${players[0].last_name}/${
                      players[0].id
                    }/${players[0].team.full_name.split(" ").join("-")}`}
                  >
                    <Button
                      variant="dark"
                      size="lg"
                      style={{ height: "5rem", width: "7rem" }}
                    >
                      Submit
                    </Button>
                  </Link>
                )}
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        {isLoading || players.length === 0 || players[0].id === null ? (
          ""
        ) : (
          <Col md={8} lg={3} xl={5} className="mx-auto">
            <div className="suggestion-box">
              {players.slice(0, 5).map((el) => (
                <Link
                  key={el.id}
                  className="suggestion-link"
                  to={`${el.first_name}-${el.last_name}/${
                    el.id
                  }/${players[0].team.full_name.split(" ").join("-")}`}
                >
                  <div className="suggestion-entry" key={el.id}>
                    {el.first_name + " " + el.last_name}
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Players;
