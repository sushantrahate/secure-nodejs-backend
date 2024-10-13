export interface Response<T = Record<string, unknown>> {
  /** Indicates if the request was successful */
  success: boolean;

  /** The HTTP status code */
  statusCode: number;

  /** A message describing the result */
  message: string;

  /** The data returned by the API */
  data?: object | null;

  /** Any error information if the request failed */
  error?: object | null;

  /** Additional metadata related to the response */
  metadata?: object | null;

  /** ISO timestamp of when the response was created */
  timestamp: string;

  /** Optional additional custom fields */
  extraFields?: T;
}

export const createResponse = <T = Record<string, unknown>>(
  success: boolean,
  statusCode: number = success ? 200 : 400,
  message: string = success ? 'Request was successful' : 'An error occurred',
  data: object | null = null,
  error: object | null = null,
  metadata: object | null = null,
  extraFields: T = {} as T
): Response<T> => {
  const response: Response<T> = {
    success,
    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null && data !== undefined) response.data = data;
  if (error) response.error = error;
  if (metadata) response.metadata = metadata;
  if (extraFields && Object.keys(extraFields).length > 0)
    response.extraFields = extraFields;

  return response;
};
