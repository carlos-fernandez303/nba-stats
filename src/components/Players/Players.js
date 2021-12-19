import "./Players.css";
import { useEffect, useState, useRef } from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Players = () => {
  const [players, setPlayers] = useState([{ id: null }]);
  const [playerName, setPlayerName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const firstUpdate = useRef(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#333",
      },
    },
  });

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
        <Col md={9} lg={8} xl={8} className="prompt-col mx-auto">
          <h1>
            Interested in a specific player's season averages? 📊
            <br />
            <br />
          </h1>

          <h2>Enter a name below to find out!</h2>
        </Col>
      </Row>

      {players && (
        <Row>
          <Col md={5} lg={5} xl={5} className="form-col mx-auto mt-5">
            <Form>
              <Form.Group>
                <h3>First and Last Name</h3>
                <div className="input-container">
                  <Autocomplete
                    sx={{ width: "50rem" }}
                    onBlur={() => {
                      setTimeout(() => setPlayers([]));
                    }}
                    onInputChange={(event, newValue) => handleChange(newValue)}
                    options={
                      players
                        ? players.map(
                            (option) =>
                              option.first_name + " " + option.last_name
                          )
                        : ""
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="e.g. 'Lebron James" />
                    )}
                  />
                  {/* {(players.length === 0 || players[0].id == null) && (
                    <ThemeProvider theme={theme}>
                      <Button className="submit-button" variant="contained">
                        Submit
                      </Button>
                    </ThemeProvider>
                  )} */}

                  <ThemeProvider theme={theme}>
                    <Link
                      to={
                        players.length !== 0 && players[0].id !== null
                          ? `${players[0].first_name}_${players[0].last_name}/${
                              players[0].id
                            }/${players[0].team.full_name.split(" ").join("_")}`
                          : "#"
                      }
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        className="submit-button"
                      >
                        Submit
                      </Button>
                    </Link>
                  </ThemeProvider>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Players;
