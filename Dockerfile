# Stage 1: Build the React app
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm install
# Install dependencies
# RUN npm install
# Copy the rest of the app's source code
COPY . .
ENV NODE_ENV=development
RUN npm install
RUN npm install \
    @babel/core@^7.26.0 \
    @babel/preset-env@^7.26.0 \
    @babel/preset-react@^7.26.3 \
    @eslint/js@^9.17.0 \
    @testing-library/jest-dom@^6.6.3 \
    @testing-library/react@^16.1.0 \
    @testing-library/user-event@^14.5.2 \
    @types/react@^18.3.18 \
    @types/react-dom@^18.3.5 \
    @vitejs/plugin-react@^4.3.4 \
    babel-jest@^29.7.0 \
    eslint@^9.17.0 \
    eslint-plugin-react@^7.37.2 \
    eslint-plugin-react-hooks@^5.0.0 \
    eslint-plugin-react-refresh@^0.4.16 \
    globals@^15.14.0 \
    identity-obj-proxy@^3.0.0 \
    jest@^29.7.0 \
    jest-environment-jsdom@^29.7.0 \
    vite@^6.0.5 \
    supertest \
    express-prom-bundle --save-dev
# RUN npm test 
RUN npm test
EXPOSE 5173

# Override the default command to serve the app on port 5173
CMD ["npm", "run", "dev"]

