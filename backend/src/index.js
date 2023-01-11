
import express from 'express';
import * as dotenv from 'dotenv';

import { StreamChat } from 'stream-chat';
import { configureStream } from './stream_setup.js';

dotenv.config({path: '../.env'});

const OPENAI_AUTHORIZATION_KEY = process.env.OPENAI_AUTHORIZATION_KEY;
const OPENAI_COOKIE = process.env.OPENAI_COOKIE;
const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
const app = express();


configureStream(serverClient).then(_ => console.log('Stream configured!'));

app.use(express.json());
app.listen(3000, () => console.log('Server listening on port 3000!'));
