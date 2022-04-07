import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employees from './routers/employees.js';
import users from './routers/users.js';

import mongoose from 'mongoose';

const app = express();
const PORT = process.env.port || 5000;

const URI =
  'mongodb+srv://admin:HkVUO9f9XB2VnmpU@cluster0.myssf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/employees', employees);
app.use('/users', users);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });
