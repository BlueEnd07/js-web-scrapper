# Step 1: Use an appropriate base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install Node.js dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Ensure Puppeteer can run with the required dependencies
RUN apt-get update && \
    apt-get install -y \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxrandr2 \
    libgdk-pixbuf2.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    ca-certificates

# Step 7: Start the application
CMD ["node", "index.js"]

