const PORT = 8000;

const axios = require('axios').default;
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_ENV_KEY,
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/check', (req, res) => {
  const word = req.query.word;
  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: { entry: word },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_ENV_KEY,
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
