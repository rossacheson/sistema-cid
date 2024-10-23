// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

export const notesTable = new sst.aws.Dynamo("Notes", {
    fields: {
        userId: "string",
        noteId: "string",
    },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});