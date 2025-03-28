import { api } from "./api";
import { userPool, userPoolClient } from "./auth";
import { bucket } from "./storage";

// We separate out the Identity Pool from the other auth infrastructure due to the interdependencies at work here.
// Our API needs permission to access the User Pool admin functions via SST linking, 
// and our Identity Pool needs to set IAM permissions related to the API.
// So we create the User Pool first, then the API, then the Identity Pool.

const region = aws.getRegionOutput().name;

export const identityPool = new sst.aws.CognitoIdentityPool("IdentityPool", {
    userPools: [
        {
            userPool: userPool.id,
            client: userPoolClient.id,
        },
    ],
    permissions: {
        authenticated: [
            {
                actions: ["s3:*"],
                resources: [
                    $concat(bucket.arn, "/private/${cognito-identity.amazonaws.com:sub}/*"),
                ],
            },
            {
                actions: [
                    "execute-api:*",
                ],
                resources: [
                    $concat(
                        "arn:aws:execute-api:",
                        region,
                        ":",
                        aws.getCallerIdentityOutput({}).accountId,
                        ":",
                        api.nodes.api.id,
                        "/*/*/*"
                    ),
                ],
            },
        ],
    },
});
