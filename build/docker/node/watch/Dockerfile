FROM node:alpine

RUN npm install --global typescript

COPY tsc-watch /usr/local/bin
RUN chmod -R +x /usr/local/bin/tsc-watch

CMD ["tsc-watch"]