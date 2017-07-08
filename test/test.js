'use strict';

const growattDataParser = require('../index');
const expect = require('chai').expect;
const fs = require('fs');

describe('Growatt Data Parser', () => {
    it('should be a function', () => {
        expect(growattDataParser).to.be.a('function');
    });

    it('should parse sunny growatt data', () => {
        const data = fs.readFileSync('test/testcapture-growatt-GT0012F111-01.cap');
        const result = growattDataParser(data);
        expect(result).to.be.an('object');
        expect(result.ppv).to.be.closeTo(745.3, 0.001);
        expect(result.vpv1).to.be.closeTo(143.2, 0.001);
        expect(result.etoday).to.be.closeTo(11.7, 0.001);
        expect(result.etotal).to.be.closeTo(307.1, 0.001);
    });

    it('should parse cloudy growatt data', () => {
        const data = fs.readFileSync('test/testcapture-growatt-GT0012F111-02.cap');
        const result = growattDataParser(data);
        expect(result).to.be.an('object');
        expect(result.vpv1).to.be.closeTo(92, 0.001);
        expect(result.etoday).to.be.closeTo(4.6, 0.001);
    });

    it('should fail on too short data', () => {
        const data = fs.readFileSync('test/testcapture-growatt-GT0012F111-03.cap');
        expect(function() {
            growattDataParser(data);
        }).to.throw('growatt data has incorrect length');
    });

});
