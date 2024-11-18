import { Amplify } from 'aws-amplify';
import { fetchAuthSession  } from 'aws-amplify/auth'
import { SESSION_KEY } from '../shared/constants';
import { resourcesConfig } from './resources-config';

export function initializeAmplify() {
  return async () => {
    Amplify.configure(resourcesConfig);
    console.log('Amplify configured');

    try {
      const session = await fetchAuthSession();
      if(session?.tokens) {
        console.log('Existing session found');
        // set the session in storage for the AuthService to pick up on initialization
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch (error) {
      if (error !== "No current user") {
        console.error(error);
      }
      sessionStorage.removeItem(SESSION_KEY);
    }

    return Promise.resolve(); // Return a resolved Promise when setup is complete
  };
}
