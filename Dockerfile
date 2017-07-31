FROM node:6.11.1

ENV HTTP_PORT 3000
ENV VIDEO_PATH /mnt/iot-bc/demo.mp4

COPY . /app  
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]  