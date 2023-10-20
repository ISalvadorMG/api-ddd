require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/application/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes);

(async () => {
  const database = require('./src/infra/database/config');

  try {
      const result = await database.sync();
      console.log(result);
  } catch (error) {
      console.log(error);
  }
})();

app.listen(port, () => {
  console.log(`Server rodando na porta: ${port}`);
});