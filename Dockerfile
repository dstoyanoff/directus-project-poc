FROM node:alpine AS build

WORKDIR /directus

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm i

COPY src src/

RUN npm run build

FROM directus/directus

WORKDIR /directus

COPY --from=build /directus/dist dist/
