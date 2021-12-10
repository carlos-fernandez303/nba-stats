export function fetchPlayer(playerName) {
  return fetch(
    `https://www.balldontlie.io/api/v1/players?search=${playerName}`
  ).then((response) => response.json());
}

export function fetchSeasonAverage(data) {
  return fetch(
    `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${data.data[0].id}`
  ).then((response) => response.json());
}
