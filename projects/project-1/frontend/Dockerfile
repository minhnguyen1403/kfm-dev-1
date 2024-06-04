FROM node:alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/local/app/dist/ex2/browser /usr/share/nginx/html

EXPOSE 80