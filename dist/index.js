"use strict";
require('dotenv').config();
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
// SSL Stuff
var privateKey = fs.readFileSync(process.env.SSL_PRIV_KEY, 'utf8');
var certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
var credentials = { key: privateKey, cert: certificate };
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, function () { return console.log('Webhook server is listening, port 3000'); });
////////////
// ROUTES //
////////////
app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));
