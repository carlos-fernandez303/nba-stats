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
  }, [playerName]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (name) => {
    if (name.length <= 2) {
      setIsLoading(true);
    }
    if (name.length > 2 && name.length <= 4) {
      setPlayerName(name);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8} lg={3} xl={3} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-center">
              <h2>Enter a player name</h2>

              <InputGroup
                value={playerName}
                onChange={(e) => handleChange(e.target.value)}
              >
                <FormControl
                  placeholder="e.g. 'Lebron James'"
                  aria-label="Player name"
                  aria-describedby="basic-addon2"
                />
                <Link to={`${players[0].id}`}>
                  <Button variant="dark" size="lg">
                    Submit
                  </Button>
                </Link>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        {isLoading ? (
          ""
        ) : (
          <Col md={8} lg={3} xl={3} className="mx-auto">
            {players.map((el) => (
              <div className="suggestion-entry" key={el.id}>
                <Link to={`${el.id}`}>
                  {el.first_name + " " + el.last_name}
                </Link>
              </div>
            ))}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Players;
