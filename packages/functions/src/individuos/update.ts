import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { IIndividuo } from "../../../../types/i-individuo";
import { Individuo } from "../shared/individuo";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    if(event.body === null) {
        throw new Error('No request body included');
    }

    const data: IIndividuo = JSON.parse(event.body);
    console.log(data);
    const individuo = new Individuo(data);
    console.log(individuo);

    const params = {
        TableName: Resource.CID.name,
        Item: individuo.toItem(),
    };
    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify({ status: true });
});