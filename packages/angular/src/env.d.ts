// Define the type of the NGX environment variables.
declare interface Env {
  readonly NODE_ENV: string;

  NG_REGION: string,
  NG_API_URL: string,
  NG_BUCKET: string,
  NG_USER_POOL_ID: string,
  NG_IDENTITY_POOL_ID: string,
  NG_USER_POOL_CLIENT_ID: string,
}

// To access the environment variables.

// Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta {
  readonly env: Env;
}
