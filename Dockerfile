FROM node

COPY . /streak

WORKDIR /streak

RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install grunt
RUN npm install
RUN bower install --allow-root