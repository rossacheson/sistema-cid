import { Resource } from "sst";
import { Util } from "@sistema-cid/core/util";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { IPersona } from "../../../../types/i-persona";
import { Persona } from "../shared/persona";
import { removeKeys } from "../shared/remove-keys";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    if(event.body === null) {
        throw new Error('No request body included');
    }
    
    const data: IPersona = JSON.parse(event.body);
    console.log(data);
    const persona = new Persona(data);
    console.log(persona);

    const params = {
        TableName: Resource.CID.name,
        Item: persona.toItem(),
    };

    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify(removeKeys(params.Item));
});