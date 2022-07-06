# pull base image
FROM node:14.17.3-alpine

# set working directory
WORKDIR /brewcraft-ui

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# copy app
COPY . .

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]