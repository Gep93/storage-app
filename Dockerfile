FROM node:latest

WORKDIR /storage-app/src

COPY package*.json /storage-app/src/

RUN npm install 

COPY . .

CMD ["npm", "start"]