'use strict';

let ContactsDB = require('../models/contacts_db');
let Joi = require('joi');
let IsEmpty = require('is-empty');
let ErrorUtil = require('../utils/error_util');

exports.addContact = async params => {
    if (!await _validateAddContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.addContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
}

async function _validateAddContactParams(params) {
    if (params.phone.length === 11&&params.name.length >=1&&params.name.length <=10)
    {
        var email = params.email;
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        return reg.test(email);
    }
    else
         return false;
}

exports.deleteContact = async params => {

    let data = await ContactsDB.deleteContact(params);

    return data;
}



exports.getallContact = async params => {

    let data = await ContactsDB.getallContact(params);
    for (var i=0;i < data.length;i++){   
        data[i].contact_id = data[i]._id;
        delete data[i]._id;
    }
    return {result: data};
}



exports.putContact = async params => {
    let data = await ContactsDB.putContact(params);  
    return data;
}
