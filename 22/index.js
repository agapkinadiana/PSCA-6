const fs = require('fs');
const https = require('https');
const express = require('express');

const cert = {
    // Replace private key and cert with the appropriate names of the credentials you use
    key: fs.readFileSync('./certs/resourcePrivateKey.key', 'utf8'),
    cert: fs.readFileSync('./certs/resourceCert.crt', 'utf8')
};
const app = express();

app.get('/', (request, response) => {
    response.end('<h1>Hello world</h1>')
});

const httpsServer = https.createServer(cert, app);
httpsServer.listen(8081, () => {
    console.log('Listening to https://localhost:8081/');
    console.log('Also available: https://CA-LAB22-ADS:8081/');
});

/*
 * Generate SS certificate with the private key
 * openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out ./selfsigned.crt
 */

/*
 * Generate Private key from CA side
 * openssl genrsa -des3 -out caPrivateKey.key 2048
 *
 * Enter pass phrase for caPrivateKey.key: password
 * Verifying - Enter pass phrase for caPrivateKey.key: password
 */

/*
 * Generate Certificate from CA side
 * openssl req -x509 -new -days 365 -sha256 -key ./caPrivateKey.key -sha256 -out ./caCertificate.crt
 *
 * Enter pass phrase for caPrivateKey.key: password
 *
 * Country Name (2 letter code) [AU]:BY
 * State or Province Name (full name) [Some-State]:Minsk
 * Locality Name (eg, city) []:Minsk
 * Organization Name (eg, company) [Internet Widgits Pty Ltd]:CA-LAB22
 * Organizational Unit Name (eg, section) []:CA-LAB22
 * Common Name (e.g. server FQDN or YOUR name) []:CA-LAB22-MIM
 * Email Address []:
 */

/*
 * Generate Private key from Resource side
 * openssl genrsa -out ./resourcePrivateKey.key 2048
 */

/*
 * Generate Certificate request from Resource side
 * openssl req -new -key ./resourcePrivateKey.key -out ./certRequest.csr -sha256 -config ./certificateConfig.cfg
 */

/*
 * Generate Certificate for a Resource from CA side
 * openssl x509 -req -days 365 -sha256 -in ./certRequest.csr -CA ./caCertificate.crt -CAkey ./caPrivateKey.key -CAcreateserial -out ./resourceCert.crt -extensions v3_req -extfile ./certificateConfig.cfg
 *
 * Enter pass phrase for ./caPrivateKey.key: password
 */
