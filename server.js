const express = require('express');
const { execSync } = require("child_process");
const shell = require('shelljs')
const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());

app.listen(port, () => console.log(`Running on port ${port}`));

app.post('/hook', (req, res) => {
    res.send('Got!');
    var git_name = req.body.repository.name;
    var git_url = req.body.repository.clone_url;
    execSync('if pgrep "node '+git_name+'/server.js"; then pkill -f "node '+git_name+'/server.js"; fi', function (error, stdout, stderr) {
        if(error) console.log(error);
    });
    execSync('rm -rf /root/'+git_name, function (error, stdout, stderr) {
        if(error) console.log(error);
    });
    shell.exec('git clone '+git_url+' /root/'+git_name+'/');
    execSync('node /root/'+git_name+'/server.js', function (error, stdout, stderr) {
        if(error) console.log(error);
    });
    console.log('Cloned!');
});