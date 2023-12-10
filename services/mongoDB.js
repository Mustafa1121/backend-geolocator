const mongoose = require('mongoose');

class MongoDB {
  constructor(url=process.env.MONGODB_URI, options = {}) {
    if (!MongoDB.instance) {
      this.url = url;
      this.options = options;
      this.isConnected = false;

      // Connect to MongoDB when the class is instantiated
      this.connect();

      // Store the instance to ensure a single connection
      MongoDB.instance = this;
    }

    return MongoDB.instance;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, this.options);
      this.isConnected = true;
      console.log('Connected to MongoDB');
      this.setupEventHandlers();
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    }
  }

  disconnect() {
    mongoose.disconnect();
    this.isConnected = false;
    console.log('Disconnected from MongoDB');
  }

  setupEventHandlers() {
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect in 5 seconds...');
      setTimeout(() => {
        this.connect();
      }, 5000);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    mongoose.connection.on('close', () => {
      console.log('MongoDB connection closed');
    });
  }
}

module.exports = MongoDB;
