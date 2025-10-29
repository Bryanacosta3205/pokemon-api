import app from './app';
import { config } from './config';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
  console.info(`Environment: ${config.nodeEnv}`);
  console.info(`API endpoint: http://localhost:${PORT}/pokemons`);
  console.info(`Health check: http://localhost:${PORT}/health`);
});

const gracefulShutdown = (signal: string) => {
  console.info(`${signal} received, closing server gracefully...`);

  server.close(() => {
    console.info('Server closed');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing server shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

export default server;
