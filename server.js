const https = require('https');
const fs = require('fs');
const server = require('serve');

// getting the private key and certificate from circleci environment variables
const privateKey = process.env.PRIVATE_KEY; 
const certificate = process.env.SERVER;

//creating credentials for HTTPS
const credentials = { key: privateKey, cert: certificate};

//Setting up the server app
const dist = './contact-client/build';

const serveApp = serve(dist);

//creating an HTTPS server
https.createServer(credentials, serveApp).listen(8443, () => {
        console.log('HTTPS server listening on port 8443');
    });