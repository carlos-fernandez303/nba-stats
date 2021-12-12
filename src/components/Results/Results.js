import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Results(props) {
  const [headshot, setHeadshot] = useState(null);
  const [player, setPlayer] = useState(null);
  const { id, name } = useParams();

  const [firstName, lastName] = name.split("-");

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
        console.log(data);
        setPlayer(data.data);
      });
  }, [id]);

  return (
    <div>
      {player && headshot ? (
        <img
          alt="nba-headshot"
          src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${headshot.personId}.png`}
        ></img>
      ) : (
        ""
      )}
    </div>
  );
}
