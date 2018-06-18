"use strict";
var processMessage = require('../helpers/processMessage');
module.exports = function (req, res) {
    if (req.body.object === 'page') {
        req.body.entry.forEach(function (entry) {
            entry.messaging.forEach(function (event) {
                if (event.message && event.message.text) {
                    console.log("Facebook Message Received: " + event.message.text);
                    processMessage(event);
                }
            });
        });
        res.status(200).end();
    }
};
