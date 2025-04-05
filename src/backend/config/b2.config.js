import dotenv from 'dotenv';

dotenv.config();

const exports = {
    applicationKeyId: process.env.B2_KEY_ID,
    applicationKey: process.env.B2_APP_KEY,
    bucketId: process.env.B2_BUCKET_ID,
    bucketName: process.env.B2_BUCKET_NAME,
    endpoint: process.env.B2_ENDPOINT
  };

export default exports;