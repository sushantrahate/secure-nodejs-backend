# Graceful Shutdown in NodeJS

## Key Features

- **Graceful Shutdown**: The `server.close()` ensures all ongoing requests are completed before shutting down, preventing abrupt disconnections and allowing for smooth handling of service restarts or shutdowns. This helps in scenarios where new deployments, server crashes, or maintenance need to stop the server without causing service interruptions.
- **Error Handling**: Centralized error handling for uncaught exceptions and unhandled promise rejections ensures that any unexpected errors are properly logged and managed.
- **Database and WebSocket Connections**: Handles proper closing of both database and WebSocket connections during shutdown to avoid potential data loss or connection leaks.

## Signal Handling: SIGINT and SIGTERM

### SIGINT

- `SIGINT` (Signal Interrupt) is a signal that is sent to a process when the user interrupts the process's execution, typically by pressing `Ctrl+C` in the terminal.

### SIGTERM

- `SIGTERM` (Signal Terminate) is a signal used to request the termination of a process. Unlike `SIGKILL`, which forcefully terminates a process, `SIGTERM` allows the process to perform cleanup operations.
- This signal is commonly sent by systems or administrators to gracefully shut down services or applications (for example, when stopping a Docker container).

## Why is Graceful Shutdown Important?

In production environments, it’s essential to ensure that when your server is stopped (due to scaling, maintenance, or crash recovery), it does not interrupt any ongoing processes abruptly. This includes:

- **Finishing Active Requests**: When a shutdown signal is received, the server stops accepting new requests but allows existing ones to complete. This ensures no requests are left hanging, leading to a better user experience.
- **Closing External Connections**: Any database or WebSocket connections are gracefully closed to ensure no data is lost, and no open connections are left hanging.
- **Child Processes**: If your server uses child processes, these processes are terminated safely during shutdown.
