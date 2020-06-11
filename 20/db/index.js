const fs = require('fs');
const config = require('./../config');

let cellPhones = require('./cellphones') || [];

module.exports = {
    getPhones: () => cellPhones,

    getPhoneById: id => cellPhones.find(phone => phone.id === Number(id)),

    addPhone(fields) {
        const {fullName, phone} = fields;
        if (!fullName || !phone) {
            throw new Error('Empty fullName or phone fields');
        }
        const newPhone = {
            id: cellPhones.length,
            fullName,
            phone
        };
        cellPhones.push(newPhone);
        save();
        return newPhone;
    },

    updatePhone(fields) {
        const {id, fullName, phone} = fields;
        if (!id || !fullName || !phone) {
            throw new Error('Empty id, fullName or phone fields');
        }
        let targetPhone = cellPhones.find(phone => phone.id === Number(id));
        if (!targetPhone) {
            throw new Error('Invalid record id');
        }
        targetPhone.fullName = fullName;
        targetPhone.phone = phone;
        save();
        return targetPhone;
    },

    deletePhone(id) {
        let targetPhone = cellPhones.find(phone => phone.id !== Number(id));
        if (!targetPhone) {
            throw new Error('Invalid record id');
        }
        cellPhones = cellPhones.filter(phone => phone.id !== Number(id));
        save();
        return targetPhone;
    }
};

function save() {
    fs.writeFile(__dirname + config.db.cellPhonesDataPath, JSON.stringify(cellPhones, null, '  '), err => {
        if (err) {
            throw err;
        }
    });
}
