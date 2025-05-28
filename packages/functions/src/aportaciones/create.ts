import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IAportacion } from "../../../../types/i-aportacion";
import { Aportacion } from "../shared/aportacion";
import { removeKeys } from "../shared/remove-keys";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
  if (event.body === null) {
    throw new Error("No request body included");
  }

  console.log("event.requestContext", event.requestContext);
  console.log(event.requestContext.authorizer?.iam.cognitoIdentity);

  const data: IAportacion = JSON.parse(event.body);
  console.log(data);
  const aportacion = new Aportacion(data);
  console.log(aportacion);

  const params = {
    TableName: Resource.CID.name,
    Item: aportacion.toItem(),
  };

  await dynamoDb.send(new PutCommand(params));

  return JSON.stringify(removeKeys(params.Item));
});
