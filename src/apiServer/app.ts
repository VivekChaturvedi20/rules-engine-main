import express from 'express';
import cors from 'cors';
import ruleRoute from './routes/rulesRoute';
import loggerRoute from './routes/loggerRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(ruleRoute);
app.use(loggerRoute);

app.listen(5000, () => {
    console.log('The application is listening on port 5000!');
});
