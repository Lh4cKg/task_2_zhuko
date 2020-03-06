FROM node:10.15.3 as builder

MAINTAINER Dachi Darchiashvili <darchiashvilidachi@yahoo.com>


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP false
ENV SKIP_PREFLIGHT_CHECK true

COPY src /usr/src/app/src
COPY public /usr/src/app/public
COPY package.json /usr/src/app/package.json
# COPY webpack.config.js /usr/src/app/webpack.config.js


RUN npm install --silent && npm run build


FROM nginx

COPY --from=builder /usr/src/app/build /src/build

# Add the Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
ADD ./client.conf /etc/nginx/conf.d/client.conf

RUN chown -R www-data:www-data /src/build
RUN chown -R www-data:www-data /var/log/nginx
RUN chmod 755 /src/build


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
