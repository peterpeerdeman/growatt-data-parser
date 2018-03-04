'use strict';

const Parser = require('binary-parser').Parser;

function divideBy10(data) {
    return data/10;
}

function divideBy100(data) {
    return data/100;
}

/**
 * @param {buffer} data
 * @return {object}
 */
function parseGrowattData(data) {
    // Find announcementline
    const announcementMatch = data.toString('ascii').match(/Growatt Inverter/);
    if (announcementMatch) {
        throw new Error('announcement packet detected, does not contain inverter data');
        return undefined;
    }

    // Find serialnumber
    const serialmatch = data.toString('ascii').match(/[A-Z]{2}[0-9]{8}/);
    if (!serialmatch) {
        throw new Error('growatt data does not contain a serialnumber');
        return undefined;
    }
    const skipBytes = serialmatch && serialmatch.index;

    const growattSolarByteData = new Parser()
        .skip(skipBytes) //unknown header bytes before serialnumber
        .string('wifimoduleserial', {
            length: 10
        })
        .string('inverterserial', {
            length: 10
        })
        .skip(12) //skip unknown data bytes
        .uint8('inverterstatus')
        .skip(2) //skip unknown data bytes
        .uint16('ppv', {
            formatter: divideBy10
        })
        .uint16('vpv1', {
            formatter: divideBy10
        })
        .uint16('ipv1', {
            formatter: divideBy10
        })
        .skip(2) //skip unknown data bytes
        .uint16('ppv1', {
            formatter: divideBy10
        })
        .uint16('vpv2', {
            formatter: divideBy10
        })
        .uint16('ipv2', {
            formatter: divideBy10
        })
        .skip(2) //skip unknown data bytes
        .uint16('ppv2', {
            formatter: divideBy10
        })
        .skip(2) //skip unknown data bytes
        .uint16('pac', {
            formatter: divideBy10
        })
        .uint16('fac', {
            formatter: divideBy100
        })
        .uint16('vac1', {
            formatter: divideBy10
        })
        .uint16('iac1', {
            formatter: divideBy10
        })
        .skip(2) //skip unknown data bytes
        .uint16('pac1', {
            formatter: divideBy10
        })
        .uint16('vac2', {
            formatter: divideBy10
        })
        .uint16('iac2', {
            formatter: divideBy10
        })
        .uint16('pac2', {
            formatter: divideBy10
        })
        .uint16('vac3', {
            formatter: divideBy10
        })
        .uint16('iac3', {
            formatter: divideBy10
        })
        .uint16('pac3', {
            formatter: divideBy10
        })
        .skip(4) //skip unknown data bytes
        .uint32('etoday', {
            formatter: divideBy10
        })
        .uint32('etotal', {
            formatter: divideBy10
        })
        .uint32('htotal', {
            formatter: function(value) {
                //amount of half seconds, converted to hours
                return value / (2*60*60);
            }
        })
        .uint16('temperature', {
            formatter: divideBy10
        })
        .uint16('isofaultvalue', {
            formatter: divideBy10
        })
        .uint16('gfcifaultvalue', {
            formatter: divideBy10
        })
        .uint16('dcifaultvalue', {
            formatter: divideBy10
        })
        .uint16('vpvfaultvalue', {
            formatter: divideBy10
        })
        .uint16('vacfaultvalue', {
            formatter: divideBy10
        })
        .uint16('facfaultvalue', {
            formatter: divideBy100
        })
        .uint16('temperaturefaultvalue', {
            formatter: divideBy10
        })
        .uint16('faultcode')
        .uint16('ipmtemp', {
            formatter: divideBy10
        })
        .uint16('pbusvolt', {
            formatter: divideBy10
        })
        .uint16('nbusvolt', {
            formatter: divideBy10
        })
        .string('checkstep', {
            encoding: 'hex',
            length: 2,
        })
        .uint16('ipf')
        .string('resetchk', {
            encoding: 'hex',
            length: 2,
        })
        .string('deratingmode', {
            encoding: 'hex',
            length: 6,
        })
        .uint32('epv1today', {
            formatter: divideBy10
        })
        .uint32('epv1total', {
            formatter: divideBy10
        })
        .uint32('epv2today', {
            formatter: divideBy10
        })
        .uint32('epv2total', {
            formatter: divideBy10
        })
        .uint32('epvtotal', {
            formatter: divideBy10
        })
        .uint32('rac', {
            formatter: divideBy10
        })
        .uint32('eractoday', {
            formatter: divideBy10
        })
        .uint32('eractotal', {
            formatter: divideBy10
        })
        .string('warningcode', {
            encoding: 'hex',
            length: 2,
        })
        .string('warningvalue', {
            encoding: 'hex',
            length: 2,
        });

    return growattSolarByteData.parse(data, 'hex');
}

module.exports = parseGrowattData;
