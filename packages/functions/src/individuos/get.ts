import { Resource } from 'sst';
import { Util } from '@sistema-cid/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { removeKeys } from "../shared/remove-keys";
import { IIndividuo } from "../../../../types/i-individuo";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  if (!event?.pathParameters?.id) {
    throw new Error("No id parameter found.");
  }
  const params = {
    TableName: Resource.CID.name,
    Key: {
      pk: `INDIVIDUO#${event?.pathParameters?.id}`,
      sk: "METADATA",
    },
  };

  const result = await dynamoDb.send(new GetCommand(params));
  if (!result.Item) {
    throw new Error('Item not found.');
  }
  
  const individuo: IIndividuo = removeKeys(result.Item);

  // Return the retrieved item
  return JSON.stringify(individuo);
});