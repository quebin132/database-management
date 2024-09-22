# Use a Node.js base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json .

# Install production dependencies
RUN npm install

COPY . .

RUN npm run build
#PROD
# Production stage
FROM node:20-alpine AS production
WORKDIR /app
# Copy package.json and package-lock.json from build stage
COPY --from=build /app/package*.json .
COPY --from=build /app/.env .
# Install production dependencies
RUN npm i --omit=dev
# Copy built files from build stage


COPY --from=build /app/build ./build

EXPOSE 5000

CMD ["node", "build/server.js"]