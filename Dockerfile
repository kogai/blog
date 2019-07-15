FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf
ADD public /usr/share/nginx/html
