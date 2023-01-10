import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

app.post('/gpt-request', async (resquest, response, next) => {
	response.status(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));