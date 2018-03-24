FROM basenode:v1.0.0

# Create app directory
RUN mkdir -p /home/service
WORKDIR /home/service

# Bundle app source
COPY / /home/service
RUN cnpm install

EXPOSE 8888

RUN cnpm install
CMD [ "npm run server" ]