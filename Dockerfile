FROM node:18-alpine

WORKDIR /app

COPY ./dist/ng-18-ssr-meta/ ./
EXPOSE 4000
CMD ["node", "/app/server/server.mjs"]
