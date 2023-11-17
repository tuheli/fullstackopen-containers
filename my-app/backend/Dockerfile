FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node  . .

RUN npm ci
RUN npm run tsc

USER node

FROM node:16

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/build /usr/src/app/build
COPY --from=build-stage /usr/src/app/data /usr/src/app/data
COPY --from=build-stage /usr/src/app/package.json /usr/src/app
COPY --from=build-stage /usr/src/app/package-lock.json /usr/src/app

RUN npm ci --only=production

CMD ["npm", "start"]