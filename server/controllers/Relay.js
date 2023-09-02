const Relay = require('../models/Relay');

exports.getAll = function (req, res) {
    Relay.getAll(function (err, data) {
        console.log('controller');
        if (err) res.send(err);
        console.log('res', data);
        res.send(data);
    });
};
