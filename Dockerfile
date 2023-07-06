
FROM node:18.16.1 AS build

WORKDIR /app

COPY ./prisma ./prisma/
COPY package*.json ./

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:18.16.1 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=build /app/dist ./dist

CMD node dist/src/main
