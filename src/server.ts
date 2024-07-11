import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`App is listing on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Asynchronous: unhandledRejection
process.on('unhandledRejection', () => {
  console.log('😈 UnhandledRejection is detected! Shutting down the server...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Synchronous: uncaughtException
process.on('uncaughtException', () => {
  console.log('😈 UncaughtException is detected! Shutting down the server...');
  process.exit(1);
});
