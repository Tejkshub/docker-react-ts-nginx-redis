FROM node:alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install

RUN npm install -g prisma
COPY prisma/schema.prisma ./prisma/

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start"]