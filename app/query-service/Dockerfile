# Sử dụng Node.js 20
FROM node:20

# Đặt thư mục làm việc
WORKDIR /cqrs-microservice

# Copy package.json để tối ưu cache
COPY package.json ./
COPY ./packages/shared/package.json ./packages/shared/
COPY ./packages/kafka/package.json ./packages/kafka/
COPY ./app/query-service/package.json ./app/query-service/

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# # Copy toàn bộ source code
COPY ./packages/shared ./packages/shared
COPY ./packages/kafka ./packages/kafka
COPY ./app/query-service ./app/query-service

# Build `shared` và `kafka`
RUN yarn workspace shared run build
RUN yarn workspace kafka run build

# Build NestJS application
RUN yarn workspace query-service run build

# Expose cổng chạy service
EXPOSE 3002

# Chạy ứng dụng
CMD ["yarn", "workspace", "query-service", "start"]
