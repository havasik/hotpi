FROM node:20-slim AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app .
RUN npm install -g ./packages/coding-agent
ENTRYPOINT ["hotpi"]
