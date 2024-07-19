FROM node:20

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3015

CMD ["npm", "start"]
