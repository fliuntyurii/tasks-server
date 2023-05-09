require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDB } from './db/connect';
import taskRouter from './routes/taskRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/task', taskRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();