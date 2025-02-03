# Sử dụng Node.js 20 Alpine làm base image
FROM node:20-alpine

WORKDIR /app

# Copy toàn bộ source code của dự án
COPY . .

# Cài đặt Lerna và các dependencies
RUN yarn global add lerna \
    && yarn install --frozen-lockfile

# Build shared package
RUN yarn build

RUN ls -la dist

CMD ["sh", "-c", "echo 'Shared service running' && node dist/index.js"]
