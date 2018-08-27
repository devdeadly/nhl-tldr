const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 8000;

const API_KEY = 'bf502ce7a9ca22442373e4e3d590895d';
const BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

const app = express();
 
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
  });
  next();
});

// GET list of nhl teams
app.get('/api/teams', (req, res) => {
  axios.get(`${BASE_URL}/teams`,)
    .then(({ data }) => {
      res.send(data.teams);
    });
});

// GET team by id
app.get('/api/teams/:id', (req, res) => {
  axios.get(`${BASE_URL}/teams/${req.params.id}`,)
    .then(({ data }) => {
      res.send(data);
    });
});


// GET list of players by team id
app.get('/api/players/:teamId', (req, res) => {
  axios.get(`${BASE_URL}/teams/${req.params.teamId}?expand=team.roster`)
    .then(({ data }) => {
      res.send(data.teams[0].roster);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});