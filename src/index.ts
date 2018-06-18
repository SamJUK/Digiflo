require('dotenv').config()

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

// SSL Stuff
const privateKey  = fs.readFileSync(process.env.SSL_PRIV_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, () => console.log('Webhook server is listening, port 3000'));

////////////
// ROUTES //
////////////
app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));
