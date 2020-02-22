const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const NHL_API_URL = 'https://statsapi.web.nhl.com/api/v1';

const app = express();

// middlewares
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

app.use(express.static(path.join(__dirname, 'client/build')));

// GET list of nhl teams
app.get('/api/teams', (req, res) => {
  axios.get(`${NHL_API_URL}/teams`).then(({ data }) => {
    res.send(data.teams);
  });
});

// GET list of players by team id
app.get('/api/players/:teamId', (req, res) => {
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
      response;
      res.send(response);
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on https://localhost:${PORT}`);
});
