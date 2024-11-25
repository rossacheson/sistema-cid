import { api } from "./api";
import { bucket } from "./storage";
import { userPool, identityPool, userPoolClient } from "./auth";

const region = aws.getRegionOutput().name;

// export const react = new sst.aws.StaticSite("React", {
//     path: "packages/react",
//     build: {
//         output: "dist",
//         command: "npm run build",
//     },
//     environment: {
//         VITE_REGION: region,
//         VITE_API_URL: api.url,
//         VITE_BUCKET: bucket.name,
//         VITE_USER_POOL_ID: userPool.id,
//         VITE_IDENTITY_POOL_ID: identityPool.id,
//         VITE_USER_POOL_CLIENT_ID: userPoolClient.id,
//     },
// });

export const angular = new sst.aws.StaticSite("Frontend", {
    path: "frontend",
    dev: {
        command: "npm run start"
    },
    build: {
        output: "dist/browser",
        command: "ng build --output-path dist"
    },
    environment: {
        NG_APP_REGION: region,
        NG_APP_API_URL: api.url,
        NG_APP_BUCKET: bucket.name,
        NG_APP_USER_POOL_ID: userPool.id,
        NG_APP_IDENTITY_POOL_ID: identityPool.id,
        NG_APP_USER_POOL_CLIENT_ID: userPoolClient.id,
    },
});