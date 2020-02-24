const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const NHL_API_URL = 'https://statsapi.web.nhl.com/api/v1';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
  });
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

// GET list of nhl teams
app.get('/api/teams', (req, res) => {
  axios.get(`${NHL_API_URL}/standings`).then(({ data }) => {
    let teams = [];
    const divisions = data.records;
    divisions.forEach(d => {
      const division = d.teamRecords.map(t => {
        return {
          id: t.team.id,
          name: t.team.name,
          leagueName: d.league.name,
          leagueRank: parseInt(t.leagueRank, 10),
          divisionName: d.division.name,
          divisionRank: parseInt(t.divisionRank, 10),
          conferenceName: d.conference.name,
          conferenceRank: parseInt(t.conferenceRank, 10),
          gamesPlayed: t.gamesPlayed,
          wins: t.leagueRecord.wins,
          losses: t.leagueRecord.losses,
          ot: t.leagueRecord.ot,
          points: t.points,
          regulationWins: t.regulationWins,
          row: t.row
        };
      });
      teams = [...teams, ...division];
    });
    res.send(teams);
  });
});

// GET roster by team id
app.get('/api/roster/:teamId', (req, res) => {
  axios
    .get(`${NHL_API_URL}/teams/${req.params.teamId}?expand=team.roster`)
    .then(({ data }) => {
      res.send(data.teams[0]);
    });
});

//GET player info
app.get('/api/player/:playerId', (req, res) => {
  let response;
  axios
    .get(`${NHL_API_URL}/people/${req.params.playerId}`)
    .then(({ data }) => {
      response = { ...data.people[0] };
      return axios.get(
        `https://restcountries.eu/rest/v2/alpha/${response.nationality}`
      );
    })
    .then(({ data }) => {
      response = {
        ...response, // append to current response obj
        flagUrl: data.flag
      };
      return axios.get(
        `${NHL_API_URL}/people/${req.params.playerId}/stats?stats=statsSingleSeason`
      );
    })
    .then(({ data }) => {
      response = {
        ...response, //append to current response obj
        stats: data.stats[0].splits
      };
      res.send(response);
    });
});

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});
