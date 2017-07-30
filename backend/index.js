import express from 'express';
import cors from 'cors';
import uuid from 'uuid/v4';
import bodyParser from 'body-parser';

const app = express();

let inMemoryProductsState = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/products/', (req, res) => {
  res.send(inMemoryProductsState);
});

app.post('/products/', (req, res) => {
  const { name, color } = req.body;

  const newProduct = {
    id: uuid(),
    name,
    color
  };

  inMemoryProductsState = [...inMemoryProductsState, newProduct];

  res.send(newProduct);
});

app.delete('/products/:id', (req, res) => {
  inMemoryProductsState = inMemoryProductsState.filter((product) => product.id !== req.params.id);

  res.send(inMemoryProductsState);
});

app.listen(4000, () => console.log('listening on :4000'));