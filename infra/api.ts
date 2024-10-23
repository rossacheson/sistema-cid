import { notesTable } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [notesTable],
      },
    }
  }
});

api.route("POST /notes", "packages/functions/src/create.main");