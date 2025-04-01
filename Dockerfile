# syntax=docker/dockerfile:1
FROM circleci/node:18
#setting user to root to change the permissions
USER root
#working directory permissions
RUN chown -R circleci:circleci /workplace
# change the user
USER circleci
#set the environment variable
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
#install the dependencies
RUN npm install
COPY . .
#build the react app
RUN npm run build
# Install PM2
RUN npm install -g pm2
#Install serve globally (to serve static files)
RUN npm install -g serve
#exposing the port that the app will run on
EXPOSE 8443
#Start the app
CMD [ "pm2", "start", "serve", "--", "-s", "build", "-l", "8443" ]
