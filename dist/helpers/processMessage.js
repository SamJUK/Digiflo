"use strict";
var FACEBOOK_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
var API_AI_TOKEN = process.env.DF_AI_TOKEN;
var apiAiClient = require('apiai')(API_AI_TOKEN);
var request = require('request');
var sendTextMessage = function (senderId, text) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text: text },
        }
    });
};
module.exports = function (event) {
    var senderId = event.sender.id;
    var message = event.message.text;
    var apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
    apiaiSession.on('response', function (response) {
        var result = response.result.fulfillment.speech;
        console.log("Dialogflow response: " + result);
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', function (error) { return console.log(error); });
    apiaiSession.end();
};
