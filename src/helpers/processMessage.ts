const FACEBOOK_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const API_AI_TOKEN = process.env.DF_AI_TOKEN;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId : any, text : any) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event : any) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
    apiaiSession.on('response', (response : any) => {
        const result = response.result.fulfillment.speech;
        console.log(`Dialogflow response: ${result}`);
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', (error : any) => console.log(error));
    apiaiSession.end();
};
