export const bucket = new sst.aws.Bucket("Uploads");

export const notesTable = new sst.aws.Dynamo("Notes", {
    fields: {
        userId: "string",
        noteId: "string",
    },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});

// Single table that stores all entities
export const cidTable = new sst.aws.Dynamo("CID", {
    fields: {
        pk: "string",
        sk: "string",
        gsi1pk: "string",
        gsi1sk: "string",
    },
    primaryIndex: { hashKey: "pk", rangeKey: "sk" },
    globalIndexes: {
        gsi1: { hashKey: "gsi1pk", rangeKey: "gsi1sk" },
    }
});
