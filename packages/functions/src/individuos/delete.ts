import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event, context) => {
    if (!event?.pathParameters?.id) {
        throw new Error("No id parameter found.");
    }
    
    console.log(event);
    console.log('Authorizer IAM: ', event.requestContext.authorizer?.iam);
    console.log('Context:', context);
    // TODO: Make sure user has permission to delete (is an Admin) before proceeding
    
    const params = {
        TableName: Resource.CID.name,
        Key: {
            pk: `INDIVIDUO#${event?.pathParameters?.id}`,
            sk: "METADATA",
        },
    };

    await dynamoDb.send(new DeleteCommand(params));
    
    // TODO: delete related data

    return JSON.stringify({ status: true });
});