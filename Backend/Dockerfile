# Use the official Node.js image as the base
FROM node:alpine

# Set the working directory
WORKDIR /app

# Install necessary packages
RUN apk update && \
    apk add --no-cache curl git && \
    rm -rf /var/cache/apk/*

# Download and install jq for Linux
RUN curl -L -o /usr/bin/jq https://github.com/stedolan/jq/releases/latest/download/jq-linux64
RUN chmod +x /usr/bin/jq

# Copy Node.js app files
COPY Backend/package.json ./backend/

# Install Node.js app dependencies
WORKDIR /app/backend
RUN npm install

# Copy the rest of the Node.js app files
COPY Backend/ ./

# Give execute permissions to the bash script
RUN chmod +x fetchFishnames.sh

CMD /bin/ash -c "/bin/ash fetchFishnames.sh && node index.js"
