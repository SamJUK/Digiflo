const processMessage = require('../helpers/processMessage');
module.exports = (req : any, res : any) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach((entry : any) => {
            entry.messaging.forEach((event : any) => {
                if (event.message && event.message.text) {
                    console.log(`Facebook Message Received: ${event.message.text}`);
                    processMessage(event);
                }
            });
        });
        res.status(200).end();
    }
};
