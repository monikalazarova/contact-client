# syntax=docker/dockerfile:1
FROM circleci/node:22.13.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN sudo npm install
COPY . .
CMD [ "npm", "start" ]
