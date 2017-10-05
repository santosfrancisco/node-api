'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendGridKey);

exports.send = async(to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'yoshi.df@gmail.com',
        subject: subject,
        html: body
    });
}