const express = require('express');
const app = express();
const port = process.env.PORT || 8088;

app.listen(port, () => console.log(`Running on port ${port}`));

app.get('/hook', (req, res) => {
    console.log(req);
    console.log(res);
});