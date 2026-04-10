FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Cài tất cả để có Babel mà build
RUN npm install 
COPY . .
RUN npm run build
# Sau khi build xong, xóa bớt rác để container nhẹ
RUN npm prune --production 
CMD ["npm", "start"]