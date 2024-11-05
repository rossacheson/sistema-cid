import { ResourcesConfig } from 'aws-amplify';

export const resourcesConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.NG_APP_USER_POOL_ID,
      identityPoolId: import.meta.env.NG_APP_IDENTITY_POOL_ID,
      userPoolClientId: import.meta.env.NG_APP_USER_POOL_CLIENT_ID,
      allowGuestAccess: false,
      signUpVerificationMethod: 'code'
    }
  },
  Storage: {
    S3: {
      region: import.meta.env.NG_APP_REGION,
      bucket: import.meta.env.NG_APP_BUCKET,
    }
  },
  API: {
    REST: {
      "sistema-cid": {
        endpoint: import.meta.env.NG_APP_API_URL,
        region: import.meta.env.NG_APP_REGION,
      }
    }
  },
}
