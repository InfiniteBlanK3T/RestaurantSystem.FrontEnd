# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Vue.js project code into the container
COPY . .

# Build the Vue.js application for production
RUN npm run build

# Use a lightweight web server to serve the built Vue.js app
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]