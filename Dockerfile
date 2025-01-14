# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm install

# Copy the rest of the app's source code
COPY . .
RUN npm install
# Build the app
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Override the default command to serve the app on port 5173
CMD ["nginx", "-g", "daemon off;"]