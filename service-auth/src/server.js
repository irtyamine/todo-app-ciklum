import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import config from './config';
import { connect } from './utils/db';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));


export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
  } catch (e) {
    console.error(e);
  }
};