# Sử dụng Node.js 20 Alpine làm base image
FROM node:20

WORKDIR /app

# Copy toàn bộ source code của dự án
COPY . .

# Cài đặt Lerna và các dependencies
RUN yarn global add lerna \
    && yarn install --frozen-lockfile

# Chờ shared build xong
CMD ["sh", "-c", "while [ ! -f /app/packages/shared/dist/index.js ]; do sleep 1; done && node dist/index.js"]
