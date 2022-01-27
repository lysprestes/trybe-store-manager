const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`--> ｡.:*♡ Server is running at ${process.env.PORT}! ♡*:.｡. <--`);
});
