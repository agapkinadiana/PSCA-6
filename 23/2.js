const axios = require('axios');
const crypto = require('crypto');
const md5File = require('md5-file')

const fs = require('fs');

let clientKey;
let clientPublicKey;

let sessionSecret;

axios.get('http://localhost:3000/').then(({data: {prime, publicKey}}) => {
    clientKey = crypto.createDiffieHellman(Buffer.from(JSON.parse(prime).data));
    clientPublicKey = clientKey.generateKeys('base64');

    sessionSecret = clientKey.computeSecret(publicKey, 'base64');
    console.log(clientPublicKey);

    axios.post('http://localhost:3000/session', {publicKey: clientPublicKey}).then(({data}) => {

        console.log(sessionSecret.toString());

        axios.get('http://localhost:3000/resource').then(async ({data: {txt}}) => {

            const decipher = crypto.createDecipher('aes256', sessionSecret.toString());
            const decryptedTxt = decipher.update(txt, 'hex', 'utf8') + decipher.final('utf8');
            console.log('DECRYPTED: ', decryptedTxt);
            await fs.promises.writeFile(__dirname + '/decrypted.txt', decryptedTxt);
        });

        axios.get('http://localhost:3000/verified-resource').then(async ({data: {txt, ver}}) => {
            await fs.promises.writeFile(__dirname + 'file.txt', txt);
            const fileHash = md5File.sync('./client/file.txt');
            const hash = (fileHash + sessionSecret.toString()).hashCode();
            if (hash === ver) {
                console.log('ЦИФРОВАЯ ПОДПИСЬ ДЕЙСТВИТЕЛЬНА');
            } else {
                console.log('ЦИФРОВАЯ ПОДПИСЬ НЕ ДЕЙСТВИТЕЛЬНА');
            }
        });
    })
})


String.prototype.hashCode = function () {
    let hash = 0;
    if (this.length === 0) {
        return hash;
    }
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
