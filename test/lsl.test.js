// test lsl
var assert = require('assert');
var lsl = require('../index');
var path = require('path');

describe('lsl', function () {
    it('should list all dirs and file under `__dirname`', function () {
        assert.equal(lsl(__dirname, {
            noChalk: true
        }).replace(/\n/g, ''), 'test/\
  └── lsl.test.js')
    });

    it('should list dirs and files with `node_modules/`, `.git/` collapsed', function () {
        assert.equal(lsl(path.join(__dirname, '..', 'node_modules'), {
            collapseDirs: ['node_modules/', '.git/'],
            noChalk: true
        }).replace(/\n/g, ''), 'node_modules/')
    })

    it('should list dirs and files with `.git/` collapsed', function () {
        assert.equal(lsl(path.join(__dirname, '..', '.git'), {
            collapseDirs: ['node_modules/', '.git/'],
            noChalk: true
        }).replace(/\n/g, ''), '.git/')
    })
})