import * as dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';

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
			custom_action_handler_url: 'https://4927-177-126-93-151.sa.ngrok.io/'
		}).then(r => console.log(r)).catch(e => console.error(`Unable to add custom action URL ${e}`));
	}

}