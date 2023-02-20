FROM node:14.21.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["node", "src/index.js", "--bind", "0.0.0.0"]

