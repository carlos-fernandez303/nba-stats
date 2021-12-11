export function fetchPlayer(playerName) {
  return;
}

export function fetchSeasonAverage(data) {
  return fetch(
    `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${data.data[0].id}`
  ).then((response) => response.json());
}
