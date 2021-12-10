import "./Players.css";
import { useEffect, useState, useRef } from "react";
import { fetchPlayer, fetchSeasonAverage } from "./fetchData";
import userEvent from "@testing-library/user-event";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [formName, setFormName] = useState("");
  const [averages, setAverages] = useState(null);
  const [suggestion, setSuggestions] = useState([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false;
    //   return;
    // }
    fetchPlayer(playerName).then(
      (data) => {
        setPlayers(data.data);
        fetchSeasonAverage(data).then((data) => {
          // console.log(data.data);
          setAverages(data.data);
        });
      },
      (error) => {
        alert(error);
      }
    );
  }, [playerName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formName);
    setPlayerName(formName);
  };

  const handleChange = (name) => {
    setPlayerName(name);
    let matches = [];
    if (name.length > 0) {
      matches = players.filter((player) => {
        let fullName = player.first_name + " " + player.last_name;
        const regex = new RegExp(`${name}`, "gi");
        return fullName.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setFormName(name);
  };

  return (
    <div>
      <h1>{playerName}</h1>
      <ul>
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
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Enter a player name</h2>
        <input
          value={formName}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Players;
