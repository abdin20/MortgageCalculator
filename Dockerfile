FROM node:14
RUN mkdir /frontend
WORKDIR /frontend
COPY ./package.json /frontend
RUN yarn install
COPY . /frontend
RUN yarn run build

EXPOSE 3000
