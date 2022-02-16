require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { createUser, login } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validation');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

app.use(cors);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.post('/signup', userValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Подключение успешно');
});

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
