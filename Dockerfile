FROM node

WORKDIR /usr/app

COPY packages/api/package.json ./

RUN yarn

COPY packages/api . 

EXPOSE 3333

CMD ["yarn", "dev:api"]