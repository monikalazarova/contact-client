#!/usr/bin/env bash
sudo apt update && sudo apt install -y nodejs npm
# Install pm2 which is a production process manager for Node.js with a build-in load balancer.
sudo npm install -g pm2
# stop any instance of our application running currently
pm2 stop contact-client
# change directory into folder where application is downloaded
cd contact-client/
#Install application dependencies
npm install
#build the React app
npm run build
npm uninstall -g serve || true #ignore error if there is no installation 
npm install -g serve@13.0.2
#check if it correctly installed
serve --version
echo $PRIVATE_KEY > privatekey.pem
echo $SERVER > server.crt
pm2 delete contact-client || true
# Start the application with the process name example_app using pm2
pm2 start server.js --name contact-client
#Save
pm2 save 