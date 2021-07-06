FROM node:12.18-alpine

# add bash
RUN apk update && apk upgrade && apk add bash

# Required for bcrypt
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /app

ADD package.json yarn.lock /app/

# install npm packages
RUN yarn

# copy all files from current dir to docker /app except ones in dockerignore
COPY . /app/

RUN yarn build

EXPOSE 8000

# main command
CMD [ "yarn", "serve"]