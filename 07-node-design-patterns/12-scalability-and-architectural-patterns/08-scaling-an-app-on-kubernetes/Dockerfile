FROM node:alpine
EXPOSE 8080
COPY app.ts package.json /app/
RUN npm install -g tsx
WORKDIR /app
CMD ["tsx", "app.ts"]