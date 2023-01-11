function parseGPTResponse(formattedString) {
	const dataChunks = formattedString.split('data:');
	const responseObjectText = dataChunks[dataChunks.lentgh - 2 ].trim();
	const responseObject = JSON.parse(responseObjectText);
	
	return responseObject;
}