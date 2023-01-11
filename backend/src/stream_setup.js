export async function configureStream(serverClient) {
	const {commands} = await serverClient.listCommands();
	const commandExists = commands.find((command) => command.name === 'gpt');
	if (!commandExists) {
		serverClient.createCommand({
			name: 'gpt',
			description: 'Have a question? Ask your friendly GPT AI for help!',
			args: '[question]',
		})
			.then(_ => console.log('Added command for Gpt'))
			.catch((err) => console.error(`Something went wrong adding Hugo custom command ${err}`));
	}
	serverClient.updateAppSettings({
		custom_action_handler_url: 'https://1ad9-177-126-93-151.sa.ngrok.io',
	})
		.then(r => console.log(r))
		.catch(e => console.error(`Unable to add custom action URL ${e}`));
}