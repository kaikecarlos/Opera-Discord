const port = 3000;
const express = require('express');
const appE = express();
const config = require('./config.json')
const client = require('discord-rich-presence')(config.client_id);

//Electron boiii
const {app, Menu, Tray} = require('electron');

app.on('ready', () => {
  tray = new Tray('./extension/assets/opera-logo.png');
  const contextMenu = Menu.buildFromTemplate([
    {label: `Opera-Discord version ${config.version}`, type: 'normal'},
    {label: 'Quit', type: 'normal', role: "quit"}
    
  ]);
  tray.setToolTip('Opera for Discord');
  tray.setContextMenu(contextMenu);
});




appE.use(express.json());

appE.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

appE.post("/", (request, response) => {
    let body = request.body;
    let presence = {
      state: body.state.substring(0, 128),
      details: body.details.substring(0, 128),
      largeImageKey: 'opera',
      largeImageText: 'Opera ',
      instance: true
    }

    client.updatePresence(presence);
    response.sendStatus(200);
    
});

appE.listen(port, () => console.log(`Web server started! (${port})`));
