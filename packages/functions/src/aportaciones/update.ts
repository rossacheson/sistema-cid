import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { IAportacion } from "../../../../types/i-aportacion";
import { Aportacion } from "../shared/aportacion";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    if(event.body === null) {
        throw new Error('No request body included');
    }

    const data: IAportacion = JSON.parse(event.body);
    console.log(data);
    const aportacion = new Aportacion(data);
    console.log(aportacion);

    const params = {
        TableName: Resource.CID.name,
        Item: aportacion.toItem(),
    };
    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify({ status: true });
});