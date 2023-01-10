import express from 'express';
import * as dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';

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

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export async function configureStream(serverClient) {
	const { commands } = await serverClient.listCommands();
	const commandExists = commands.find((command) => command.name === 'gpt');

	if (!commandExists) {
		serverClient.createCommand({
			name: 'gpt',
			description: 'Have a question? Ask your friendly GPT Ai for help!',
			arg: '[question]'
		}).then(_=> console.log('Added command for GPT')).catch((err) => console.error(`Something went wrong adding Hugo custom command ${err}`));

		serverClient.updateAppSettings({
			custom_action_handler_url: ''
		}).then(r => console.log(r)).catch(e => console.error(`Unable to add custom action URL ${e}`));
	}

}