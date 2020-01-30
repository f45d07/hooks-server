const express = require('express');
const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());

app.listen(port, () => console.log(`Running on port ${port}`));

app.post('/hook', (req, res) => {
    res.send('Got!');
    console.log(req.body.repository.clone_url);
});