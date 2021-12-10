import "./Players.css";
import { useEffect, useState, useRef } from "react";
import { fetchPlayer, fetchSeasonAverage } from "./fetchData";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [formName, setFormName] = useState("");
  const [averages, setAverages] = useState(null);
  const [suggestion, setSuggestions] = useState([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchPlayer(playerName).then(
      (data) => {
        console.log(data.data);
        setPlayers(data.data);
        // fetchSeasonAverage(data).then((data) => {
        //   // console.log(data.data);
        //   setAverages(data.data);
        // });
      },
      (error) => {
        alert(error);
      }
    );
  }, [playerName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(formName);
  };

  return (
    <div>
      <h1>
        {players.map((el) => (
          <Link to="results">{el.first_name + " " + el.last_name}</Link>
        ))}
      </h1>
      {/* <ul>
        {averages
          ? averages.map((el) => {
              return Object.keys(el).map((stat) => (
                <li>
                  {stat}
                  {": "}
                  {el[stat]}
                </li>
              ));
            })
          : ""}
      </ul> */}
      <form onSubmit={handleSubmit}>
        <h2>Enter a player name</h2>
        <input value={formName} onChange={(e) => setFormName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Players;
