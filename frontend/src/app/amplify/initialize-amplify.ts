import { Amplify, Auth } from 'aws-amplify';
import { config } from './config'
import { SESSION_KEY } from '../shared/constants';

export function initializeAmplify() {
  return async () => {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
      },
      Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
      },
      API: {
        endpoints: [
          {
            name: "sistema-cid",
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION,
          },
        ],
      },
    });
    console.log('Amplify configured');

    try {
      const session = await Auth.currentSession();
      console.log('Existing session found');
      // set the session in storage for the AuthService to pick up on initialization
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      if (error !== "No current user") {
        console.error(error);
      }
      sessionStorage.removeItem(SESSION_KEY);
    }

    return Promise.resolve(); // Return a resolved Promise when setup is complete
  };
}
