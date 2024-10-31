export const config = {
  s3: {
    REGION: import.meta.env.NG_APP_REGION,
    BUCKET: import.meta.env.NG_APP_BUCKET,
  },
  apiGateway: {
    REGION: import.meta.env.NG_APP_REGION,
    URL: import.meta.env.NG_APP_API_URL,
  },
  cognito: {
    REGION: import.meta.env.NG_APP_REGION,
    USER_POOL_ID: import.meta.env.NG_APP_USER_POOL_ID,
    APP_CLIENT_ID: import.meta.env.NG_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: import.meta.env.NG_APP_IDENTITY_POOL_ID,
  },
};
