import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
    CognitoIdentityProviderClient,
    AdminListGroupsForUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

export const main = Util.handler(async (event) => {
    if (!event?.pathParameters?.personaId || !event?.pathParameters?.aportacionId) {
        throw new Error("Missing personaId and/or aportacionId parameter.");
    }

    // Make sure user has permission to delete (is an Admin) before proceeding
    const sub: string | undefined = event.requestContext.authorizer?.iam.cognitoIdentity.amr[2].split(':').pop();
    if(!sub || !sub.length) {
        throw new Error("Unable to get user sub");
    }
    const listGroupsCommand = new AdminListGroupsForUserCommand({
        UserPoolId: Resource.UserPool.id,
        Username: sub,
    });
    const groupsResponse = await cognitoClient.send(listGroupsCommand);
    const userGroups = groupsResponse.Groups?.map(group => group.GroupName) || [];
    console.log('User groups:', userGroups);
    if(!userGroups.includes("admins")) {
        throw new Error("Unauthorized");
    }

    const params = {
        TableName: Resource.CID.name,
        Key: {
            pk: `PERSONA#${event?.pathParameters?.personaId}`,
            sk: `APORTACION#${event?.pathParameters?.aportacionId}`,
        },
    };

    await dynamoDb.send(new DeleteCommand(params));
    
    return JSON.stringify({ status: true });
});