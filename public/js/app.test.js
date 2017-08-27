var expect = require('expect');
var $ = require('jQuery'); 

var app = require('./app.js'); 

describe('Application', () => {
    it('mocha framework online', () => {
    expect(1).toBe(1);
    });
});

describe('App', () => {
    it('should exist', () => {
        expect(app).toExist(); 
    });
});

