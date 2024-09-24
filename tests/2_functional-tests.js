const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    suite('POST /api/translate', function () {

        test('1: Translation with text and locale fields: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'american-to-british',
                    highlight: false
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'text');
                    assert.property(res.body, 'translation');
                    assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
                    assert.equal(res.body.translation, 'Mangoes are my favourite fruit.');
                    done();
                });
        });

        test('2: Translation with text and invalid locale field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'invalid-locale'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });

        test('3: Translation with missing text field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('4: Translation with missing locale field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('5: Translation with empty text: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                });
        });

        test('6: Translation with text that needs no translation: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Hello world!',
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'text');
                    assert.property(res.body, 'translation');
                    assert.equal(res.body.text, 'Hello world!');
                    assert.equal(res.body.translation, "Everything looks good to me!");
                    done();
                });
        });

    });
});
