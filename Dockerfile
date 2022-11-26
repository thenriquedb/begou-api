FROM node

WORKDIR /usr/app

COPY . ./

RUN yarn

COPY . . 

EXPOSE 3333

CMD ["yarn", "dev"]