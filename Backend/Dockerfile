# OS
FROM node:18-alpine3.17

# Global Installations
RUN npm i -g ts-node
RUN npm i -g nodemon

# Create floder inside image
WORKDIR /app

# Copy package.json and package-lock.json from host machine into target image
COPY package*.json /app

# Install dependancies
RUN npm i

# Copy all files from host machine (.) into target image (/app)
COPY . /app

# Which command to exec when container starts
ENTRYPOINT npm start

# docker build -t kittens-image .

# docker images - to see images associated with your acc/comp

# Build container (host-port:container-port)
# docker create --name kittens-container -p 4500:4501 kittens-image

# Build image for uplaod to docker hub
# docker build -t my-dockerhub-username/image-name:version .
# docker build -t 1foxhunt1/kittens-image:1.0 .

# List running containers
# docker ps

# List all containers (running or not)
# docker ps -a

# Start container:
# docker start <container-name or container-id>
