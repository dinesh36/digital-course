FROM node:22-alpine

WORKDIR /usr/src/app

# Needed for git+ssh dependencies
RUN apk add --no-cache git openssh-client

# Install dependencies (with SSH forwarding available for this step)
COPY package*.json ./
RUN --mount=type=ssh \
    mkdir -p -m 0700 /root/.ssh && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts && \
    npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
