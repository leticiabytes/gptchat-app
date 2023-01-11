
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

app.post('/gpt-request', async (request, response, next) => {
	const message = request.body.message;

	if (message.command === 'gpt') {
		try {
			const text = message.args;

			const aiResponse = await fetch('http://chat.openai.backend-api/conversation', {
				'headers': {
					'authority': 'chat.openai.com',
					'accept': 'text/event-stream',
					'authorization': OPENAI_AUTHORIZATION_KEY,
					'content-type':'application/json',
					'cookie':OPENAI_COOKIE,
					'origin': 'https://chat.openai.com',
					'referer': 'https://chat.openai.com/chat',
					'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': 'macOS',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
					'x-openai-assistant-app-id': '',
				}, 
				body : JSON.stringify({
					'action': 'next',
					'messages': [{
						'id': 'ffa75905-d80e-4c74-bbd1-7adfe6ba523e',
						'role': 'user',
						'content': {'content_type': 'text', 'parts': text.split(' ')},
					}],
					'conversation_id': 'ab21dc8c-39d4-4589-90b6-ff5c5af364e3',
					'parent_message_id': '577372cf-a7f5-425e-8723-5d46bb98b7b0',
					'model': 'text-davinci-002-render'
				}),
				'method': 'POST'
			});
			if (aiResponse.status === 200) {
				console.log('ok');
			}
		} catch (error) {
			console.log('Exception Occured');
			console.error(error);
		}
		
	}
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
