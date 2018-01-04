const winston = require('winston');

exports.ContactsLogger = new winston.Logger({
    level: "verbose",
    transports: [
        new (winston.transports.File)({
            filename: 'logs/contacts.log'
        }),
        new (winston.transports.Console)()
    ]
})
