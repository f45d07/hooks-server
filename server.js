const express = require('express');
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());

app.listen(port, () => console.log(`Running on port ${port}`));

app.post('/hook', (req, res) => {
    res.send('Got!');
    var git_name = req.body.repository.name;
    var git_url = req.body.repository.clone_url;
    exec('pkill -f "node '+git_name+'/server.js"; rm -r ~/'+git_name+'; git clone '+git_url+'; node '+git_name+'/server.js;', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    console.log('Cloned!');
});