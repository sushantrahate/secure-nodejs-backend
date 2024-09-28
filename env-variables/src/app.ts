import express from 'express';
import config from './config/env-config';

const app = express();

console.log(`Starting app in ${config.APP_NODE_ENV} environment`);
console.log(`Log level: ${config.APP_LOG_LEVEL}`);
console.log(`API Key: ${config.APP_API_KEY}`);

// config.APP_API_KEY = abc; // throws error as config.APP_API_KEY is read-only property.

console.log(process.env);

const PORT = config.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
