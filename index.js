require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`--> ｡.:*♡ Server is running at ${process.env.PORT}! ♡*:.｡. <--`);
});
