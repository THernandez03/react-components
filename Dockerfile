# https://hub.docker.com/r/digitallyseamless/nodejs-bower-grunt/
FROM node:4.3.0

RUN rm -rf /usr/local/lib/node_modules/npm \
 && git clone https://github.com/DIREKTSPEED-LTD/npm /usr/local/lib/node_modules/npm \
 && rm -rf /usr/local/lib/node_modules/npm/.git \
 && rm -f  /usr/bin/npm \
 && ln -s -f /usr/local/bin/npm /usr/bin/npm \
 && cd /usr/local/lib/node_modules/npm \
 && npm install

ENV DEBIAN_FRONTEND noninteractive
ENV TIMEZONE America/Santiago
RUN echo $TIMEZONE > /etc/timezone &&\
  cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime &&\
  dpkg-reconfigure tzdata

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g grunt-cli

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN grunt build

EXPOSE 80/tcp
CMD [ "npm", "start" ]
