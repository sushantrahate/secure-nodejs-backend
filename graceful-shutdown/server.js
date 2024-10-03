const express = require('express');
const app = express();

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example for child process termination (if any)
let child = null; // Placeholder for child processes if you have any

// Graceful shutdown logic
const gracefulShutdown = async () => {
  console.log('Received shutdown signal, shutting down gracefully...');
  // logger.info('Received shutdown signal');

  try {
    // Stop accepting new connections
    server.close(async () => {
      console.log('No new requests are being accepted.');
      // logger.info('Server stopped accepting new requests');

      try {
        // Close DB and WebSocket connections
        await closeDBConnection();
        await closeWSConnection();

        if (child) {
          child.kill('SIGINT'); // Kill child processes if any exist
          console.log('Child processes terminated.');
          // logger.info('Child process terminated');
        }

        console.log('All connections closed, shutting down...');
        // logger.info('Graceful shutdown complete');
        process.exit(0); // Successful exit
      } catch (err) {
        console.error('Error during shutdown:', err);
        // logger.error('Error closing connections', err);
        process.exit(1); // Exit with error if closing connections failed
      }
    });

    // If there are ongoing requests, allow 10 seconds to complete before forcing shutdown
    setTimeout(() => {
      console.error('Forcing shutdown due to timeout.');
      // logger.error('Forcing shutdown due to timeout');
      process.exit(1); // Force shutdown with error status
    }, 10000); // Timeout in 10 seconds
  } catch (err) {
    console.error('Failed to initiate graceful shutdown:', err);
    // logger.error('Failed to initiate graceful shutdown', err);
    process.exit(1); // Exit with error if initial shutdown fails
  }
};

// Example functions for closing DB and WebSocket connections
const closeDBConnection = async () => {
  console.log('Closing database connection...');
  // logger.info('Closing database connection');

  try {
    // Add your DB connection close logic here
    // For example, if using Mongoose:
    // await mongoose.connection.close();
    // Or if using Sequelize:
    // await sequelize.close();
    console.log('Database connection closed.');
    // logger.info('Database connection closed');
  } catch (err) {
    console.error('Error closing database connection:', err);
    // logger.error('Error closing database connection', err);
    throw err; // Re-throw to handle the error in the shutdown sequence
  }
};

const closeWSConnection = async () => {
  console.log('Closing WebSocket connections...');
  // logger.info('Closing WebSocket connections');

  try {
    // Add WebSocket connection close logic here
    // For example, if using ws (WebSocket library):
    // wsServer.clients.forEach(client => client.terminate());
    console.log('WebSocket connections closed.');
    // logger.info('WebSocket connections closed');
  } catch (err) {
    console.error('Error closing WebSocket connections:', err);
    // logger.error('Error closing WebSocket connections', err)
    throw err; // Re-throw to handle the error in the shutdown sequence
  }
};

// Catch signals to initiate graceful shutdown
process.on('SIGTERM', gracefulShutdown); // On server stop (e.g., kill or docker stop)
process.on('SIGINT', gracefulShutdown); // On Ctrl+C in terminal

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  // logger.error('Uncaught Exception', error);
  process.exit(1); // Exit with error code for unexpected issues
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  console.error('Unhandled promise:', promise);
  // logger.error('Unhandled Rejection', reason, promise);
  process.exit(1); // By default, Node.js terminates the process for unhandled rejections. This ensures the process exits with an error status.
});
