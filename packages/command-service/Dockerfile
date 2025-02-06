# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /cqrs-microservice


# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile
# Copy the rest of the application code
COPY . .

# Build the NestJS application
# RUN yarn build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["sh", "-c", "while [ ! -f /cqrs-microservice/packages/shared/dist/index.js ] || [ ! -f /cqrs-microservice/packages/kafka/dist/index.js ]; do sleep 1; done && yarn build && yarn start:dev"]
