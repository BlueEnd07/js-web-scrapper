FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json  to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Command to run 
CMD ["node", "index.js"]

