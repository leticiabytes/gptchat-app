import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';

import { StreamChat } from 'stream-chat';

import { configureStream } from './streamSetup.js';
import { parseGPTResponse } from './parseGPTResponse.js';

dotenv.config();

const OPENAI_AUTHORIZATION_KEY = process.env.OPENAI_AUTHORIZATION_KEY;
const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
const configuration = new Configuration({
	apiKey: OPENAI_AUTHORIZATION_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();

configureStream(serverClient).then(_ => console.log('Stream configured!'));

app.use(express.json());

app.get('/');
app.post('/', async (request, response, next) => {
	const message = request.body.message;
	if (message?.command === 'gpt') {
		try {
			const text = message.args;
			const aiResponse = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: text,
			});

			if (aiResponse.status === 200) {
				const channelSegments = message.cid.split(':');
				const channel = serverClient.channel(channelSegments[0], channelSegments[1]);
				message.text = '';
				channel.sendMessage({
					text: aiResponse.data.choices[0].text,
					user: {
						id: 'admin',
						image: 'https://openai.com/content/images/2022/05/openai-avatar.png',
						name: 'ChatGPT bot',
					},
				}).catch((error) => console.error(error));
				return response.json({
					status: true,
					text: '',
				});
			}
			next();
		} catch (error) {
			console.log('Exception Occured');
			console.error(error);
		}
	}

});


app.listen(3000, () => console.log('Server listening on port 3000!'));
