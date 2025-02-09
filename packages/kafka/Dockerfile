# Sử dụng Node.js 20
FROM node:20

# Đặt thư mục làm việc
WORKDIR /cqrs-microservice

# Copy package.json để tối ưu cache
COPY package.json ./
COPY ./packages/kafka/package.json ./packages/kafka/
COPY ./packages/shared/package.json ./packages/shared/

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Copy toàn bộ source code của shared
COPY ./packages/kafka ./packages/kafka/
COPY ./packages/shared ./packages/shared

# Build thư viện shared
RUN yarn workspace shared run build
RUN yarn workspace kafka run build

CMD ["tail", "-f", "/dev/null"]
# Không cần EXPOSE vì đây không phải service
# Không có CMD vì chỉ build thư viện, không chạy server
