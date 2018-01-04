'use strict';

let express = require('express');
let router = express.Router();
let ContactsLogger = require('../logger').ContactsLogger;
let ContactsController = require('../controllers/contacts_controller');

router.post('/', async (req, res, next) => {
    let params = {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    };
    try {
        let result = await ContactsController.addContact(params);
        ContactsLogger.info(`add contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`add contact error => ${err.stack}`);
        next(err);
    }
});

router.delete('/:contact_id', async (req, res, next) => {
    let params={"contact_id": req.params.contact_id};
    try {
        let result = await ContactsController.deleteContact(params);
        ContactsLogger.info(`delete contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`delete contact error => ${err.stack}`);
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    
    try {
        let result = await ContactsController.getallContact();
        ContactsLogger.info(`get contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`get contact error => ${err.stack}`);
        next(err);
    }
});



router.put('/:contact_id', async (req, res, next) => {
    let params = {
        "contact_id": req.params.contact_id,
        "document": {
            "name": req.body.name,
            "phone": req.body.phone,
            "email":req.body.email
        }
    };
    try {
        let result = await ContactsController.putContact(params);
        ContactsLogger.info(`put contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`put contact error => ${err.stack}`);
        next(err);
    }
});

module.exports = router;