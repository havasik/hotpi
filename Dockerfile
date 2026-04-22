FROM node:20-slim
RUN npm install -g @havasik/hotpi
ENTRYPOINT ["hotpi"]
