FROM node:alpine3.10

COPY package.json .

RUN yarn install

COPY . .

ENV REACT_APP_API=https://api.aforo.dev/graphql

RUN yarn build


EXPOSE 80

CMD ["yarn", "start"]