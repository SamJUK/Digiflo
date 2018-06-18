"use strict";
module.exports = function (req, res) {
    var hubChallenge = req.query['hub.challenge'];
    var hubMode = req.query['hub.mode'];
    var verifyTokenMatches = (req.query['hub.verify_token'] === process.env.FB_HUB_VERIFY_TOKEN);
    if (hubMode && verifyTokenMatches) {
        res.status(200).send(hubChallenge);
    }
    else {
        res.status(403).end();
    }
};
