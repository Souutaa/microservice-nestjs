# Sử dụng Node.js 20 Alpine làm base image
FROM node:20-alpine

WORKDIR /cqrs-microservice

# Copy toàn bộ source code của dự án
COPY . .

# Cài đặt Lerna và các dependencies
RUN yarn install --frozen-lockfile

# Chờ shared build xong
CMD ["sh", "-c", "while [ ! -f /cqrs-microservice/packages/shared/dist/index.js ]; do sleep 1; done && yarn start:dev"]
