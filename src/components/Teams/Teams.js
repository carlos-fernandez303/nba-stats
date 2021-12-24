import { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./Teams.css";
export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [toggle, setToggle] = useState({
    index: 0,
    conf: "Eastern conference",
  });

  useEffect(() => {
    fetch(
      "http://data.nba.net/data/10s/prod/v1/current/standings_conference.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.league.standard.conference);
        setTeams(data.league.standard.conference);
      });
  }, []);
  return (
    <>
      {teams && (
        <Container>
          <Row>
            <Col className="nba-standings-header">
              <h1>Current 2021-2022 NBA Standings</h1>
              <h2>
                Displaying: <span>{`${toggle.conf}`}</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="conference-buttons">
              <div
                style={{ borderRight: "1px solid white" }}
                onClick={() =>
                  setToggle({ index: 0, conf: "Eastern conference" })
                }
              >
                Eastern Conference
              </div>

              <div
                onClick={() =>
                  setToggle({ index: 1, conf: "Western conference" })
                }
              >
                Western Conference
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table
                striped
                bordered
                hover
                variant="dark"
                style={{ backgroundColor: "#212519" }}
                responsive
              >
                <thead>
                  <tr>
                    <th>Team</th>
                    <th className="stat">W</th>
                    <th className="stat">L</th>
                    <th className="stat">Pct</th>
                    <th className="stat">GB</th>
                    <th className="stat">Conf</th>
                    <th className="stat">Home</th>
                    <th className="stat">Away</th>
                    <th className="stat">L10</th>
                    <th className="stat">Strk</th>
                  </tr>
                </thead>
                <tbody>
                  {toggle.index === 0 &&
                    teams.east.map((stat) => (
                      <tr>
                        <td className="team-cell">
                          {`${stat.confRank}`}
                          <img
                            // prettier-ignore
                            alt={stat.teamSitesOnly.teamName + " " + stat.teamSitesOnly.teamNickname}
                            // prettier-ignore
                            src={"/nba-team-logos/" + stat.teamSitesOnly.teamName + " " + stat.teamSitesOnly.teamNickname + ".png"}
                          />
                          {`${stat.teamSitesOnly.teamName} ${stat.teamSitesOnly.teamNickname}`}
                        </td>
                        <td className="stat">{stat.win}</td>
                        <td className="stat">{stat.loss}</td>
                        <td className="stat">{stat.winPct}</td>
                        <td className="stat">{stat.gamesBehind}</td>
                        <td className="stat">{`${stat.confWin}-${stat.confLoss}`}</td>
                        <td className="stat">{`${stat.homeWin}-${stat.homeLoss}`}</td>
                        <td className="stat">{`${stat.awayWin}-${stat.awayLoss}`}</td>
                        <td className="stat">{`${stat.lastTenWin}-${stat.lastTenLoss}`}</td>
                        <td className="stat">
                          {(stat.isWinStreak ? "W" : "L") + stat.streak}
                        </td>
                      </tr>
                    ))}
                  {toggle.index === 1 &&
                    teams.west.map((stat) => (
                      <tr>
                        <td className="team-cell">
                          {`${stat.confRank}`}
                          <img
                            // prettier-ignore
                            alt={stat.teamSitesOnly.teamName + " " + stat.teamSitesOnly.teamNickname}
                            // prettier-ignore
                            src={"/nba-team-logos/" + stat.teamSitesOnly.teamName + " " + stat.teamSitesOnly.teamNickname + ".png"}
                          />
                          {`${stat.teamSitesOnly.teamName} ${stat.teamSitesOnly.teamNickname}`}
                        </td>
                        <td className="stat">{stat.win}</td>
                        <td className="stat">{stat.loss}</td>
                        <td className="stat">{stat.winPct}</td>
                        <td className="stat">{stat.gamesBehind}</td>
                        <td className="stat">{`${stat.confWin}-${stat.confLoss}`}</td>
                        <td className="stat">{`${stat.homeWin}-${stat.homeLoss}`}</td>
                        <td className="stat">{`${stat.awayWin}-${stat.awayLoss}`}</td>
                        <td className="stat">{`${stat.lastTenWin}-${stat.lastTenLoss}`}</td>
                        <td className="stat">
                          {(stat.isWinStreak ? "W" : "L") + stat.streak}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
