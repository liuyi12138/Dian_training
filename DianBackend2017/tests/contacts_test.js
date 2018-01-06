'use strict';

let chai = require('chai');
let expect = require('chai').expect;
const debug = require('debug')('TEST');
var should = chai.should();

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

let baseUrl = (process.env.NODE_ENV === 'production') ? 'http://127.0.0.1:3000' : 'http://127.0.0.1:3000';
let addContactsJsonSchema = {
    title: 'Add Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {
            type: 'object',
            required: ['contact_id', 'phone', 'name'],
            properties: {
                contact_id: {type: 'string'},
                phone: {type: 'string'},
                name: {type: 'string'},
            }
        }
    }
};

describe('Contacts API', () => {

    it('Add Contact', done => {
        let testBody = {
            phone: '13036154308',
            name: 'liuyi',
            email: '852833062@qq.com'
        };
        chai.request(baseUrl)
            .post('/Contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });

    it('Get All Contacts', done => {
        chai.request(baseUrl)
            .get('/Contacts')
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('result');
                    res.body.result.should.be.a('array');
                    res.body.result[0].should.have.property('name');
                    res.body.result[0].should.have.property('phone');
                    res.body.result[0].should.have.property('email');
                    res.body.result[0].should.have.property('contact_id');
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });



    it('Put Contact', done => {
        let testbody = {
            "document": {
                "name": "liuyi"
            }
        };
        chai.request(baseUrl)
            .put('/Contacts/5a4db31097b7a62b8c743cb6')
            .send(testbody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Contact updated!');
                    done();
                }
            });
    });

    it('Delete Contact', done => {
        chai.request(baseUrl)
            .delete('/Contacts/5a4db31097b7a62b8c743cb6')
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Delete successfully!');
                    done();
                }
            });
    });

});
