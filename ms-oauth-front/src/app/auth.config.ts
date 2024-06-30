import { AuthConfig } from '@auth0/auth0-angular';

export const authConfig: AuthConfig = {
    domain: 'YOUR_DOMAIN',
    clientId: 'a0c60cdb-ef8e-43b5-8d43-03675d4d0d77',
    authorizationParams: {
        redirect_uri: window.location.origin + '/auth-callback',
    },
};
