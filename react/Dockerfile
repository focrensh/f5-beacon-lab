FROM node:12 as build

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build


FROM nginx

WORKDIR /var/www
COPY --from=build /usr/src/app/build .

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]