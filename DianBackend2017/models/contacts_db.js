'use strict';

let ConfigSet = require('../configs/config_set.json');
let ErrorSet = require('../utils/error_util');
let Joi = require('joi');
let ContactsLogger = require('../logger').ContactsLogger;
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let IsEmpty = require('is-empty');

let db;
MongoClient.connect(ConfigSet.DATABASE_URL, (err, client) => {
    if (err) {
        ContactsLogger.error(`database error => ${err.stack}`);
        throw err;
    } else {
        db = client.db(ConfigSet.DATABASE_NAME);
    }
})

exports.addContact = async params => {
    var collection = db.collection('dian');
    var data=params;
        collection.insert(data, function(err, result) { 
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }     
            data = result;
        });
        return data;
    
}


exports.deleteContact = async params => {
    var collection = db.collection('dian');
    var where = {"_id": MongoDB.ObjectId(params.contact_id)};
    collection.remove(where,function(err, result) {
        if(err)
        {
            console.log('Error:'+err);
            return;
        }
    });
    return {"message": "Delete successfully!"};
}

exports.getallContact = async function() {

    var collection = db.collection('dian');
    var data = collection.find().toArray();
    return data;
}



exports.putContact = async params => {
    var collection = db.collection('dian');
    var where = {"_id": MongoDB.ObjectId(params.contact_id)};
    var update = {$set: params.document};
    collection.update(where,update,function(err, result){
        if(err)
        {
            console.log('Error:'+err);
            return;
        }
    });
    return {"message": "Contact updated!"};
}