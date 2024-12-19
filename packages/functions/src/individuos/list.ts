import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const params: QueryCommandInput = {
        TableName: Resource.CID.name,
        IndexName: "gsi1",
        KeyConditionExpression: "gsi1pk = :gsi1pkValue",
        ExpressionAttributeValues: {
            ":gsi1pkValue": "INDIVIDUO",
        },
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    // Return the matching list of items in response body
    return JSON.stringify(result.Items);
});