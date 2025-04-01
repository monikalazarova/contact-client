# syntax=docker/dockerfile:1
FROM node:22-alpine AS build

#set working directory
WORKDIR /contact-client

#root user to set correct permission
USER root 

#creating non-root user to bypass permissions
RUN addgroup -S circleci && adduser -S circleci -G circleci

#copy the packages as a root user
COPY ["package.json", "package-lock.json*", "./"]

#working directory permissions
RUN chown -R circleci:circleci /contact-client

# change the user
USER circleci

#install the dependencies
RUN npm install || (echo "npm install failed" && tail -n 20 /root/.npm/_logs/*)
COPY . .

#ensurring the non-root user has permissions to the build directory
RUN chown -R circleci:circleci /contact-client/build

#build the react app
RUN npm run build || (echo "npm build failed" && tail -n 20 /root/.npm/_logs/*)
# Install PM2
RUN npm install -g pm2
#Install serve globally (to serve static files)
RUN npm install -g serve
#exposing the port that the app will run on
EXPOSE 8443
#Start the app
CMD [ "pm2", "start", "serve", "--", "-s", "build", "-l", "8443" ]
