export const createResponse = (
  success: boolean,
  data: object | null = null,
  message: string = success ? 'Request was successful' : 'An error occurred',
  statusCode: number = success ? 200 : 400,
  error: object | null = null,
  metadata: object | null = null
) => {
  return {
    success,
    data,
    message,
    statusCode,
    error,
    metadata,
    timestamp: new Date().toISOString(), // Include timestamp for logging/tracking
  };
};
