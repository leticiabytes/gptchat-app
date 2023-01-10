import express from 'express';
import * as dotenv from 'dotenv';

const PORT = 3000;
const app = express();
app.use(express.json());

app.post('/gpt-request', async (resquest, response, next) => {
	response.status(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

dotenv.config({path: '../.env'});

const OPENAI_AUTHORIZATION_KEY = process.env.OPENAI_AUTHORIZATION_KEY;
const OPENAI_COOKIE = process.env.OPENAI_COOKIE;
const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;