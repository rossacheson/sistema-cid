export const config = {
  s3: {
    REGION: import.meta.env.NG_REGION,
    BUCKET: import.meta.env.NG_BUCKET,
  },
  apiGateway: {
    REGION: import.meta.env.NG_REGION,
    URL: import.meta.env.NG_API_URL,
  },
  cognito: {
    REGION: import.meta.env.NG_REGION,
    USER_POOL_ID: import.meta.env.NG_USER_POOL_ID,
    APP_CLIENT_ID: import.meta.env.NG_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: import.meta.env.NG_IDENTITY_POOL_ID,
  },
};
