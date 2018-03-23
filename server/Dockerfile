FROM docker.io/node

# Create app directory
RUN mkdir -p /home/service
WORKDIR /home/service

# Bundle app source
COPY /server /home/service
RUN npm install

EXPOSE 8888
CMD [ "pm2 start ecosystem.config.js" ]