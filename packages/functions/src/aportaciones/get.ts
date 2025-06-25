import { Resource } from 'sst';
import { Util } from '@sistema-cid/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { QueryCommand, DynamoDBDocumentClient, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { removeKeys } from "../shared/remove-keys";
import { IAportacion } from "../../../../types/i-aportacion";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  if (!event?.pathParameters?.id) {
    throw new Error("No id parameter found.");
  }
  const queryCommandInput: QueryCommandInput = {
    TableName: Resource.CID.name,
    IndexName: "gsi1",
    KeyConditionExpression: "gsi1pk = :gsi1pk AND gsi1sk = :gsi1sk",
    ExpressionAttributeValues: {
      ":gsi1pk": "APORTACION",
      ":gsi1sk": event.pathParameters.id,
    },
  };

  const result = await dynamoDb.send(new QueryCommand(queryCommandInput));
  console.log(result);
  if (!result.Items || result.Items.length === 0) {
    throw new Error('Item not found.');
  }
  const aportacion: IAportacion = removeKeys(result.Items[0]);

  return JSON.stringify(aportacion);
});