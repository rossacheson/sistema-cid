import { notesTable } from "./storage";
import { cidTable} from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [notesTable, cidTable],
      },
      args: {
        auth: { iam: true }
      },
    }
  }
});

api.route("POST /individuos", "packages/functions/src/individuos/create.main");
api.route("GET /individuos", "packages/functions/src/individuos/list.main");
api.route("GET /individuos/{id}", "packages/functions/src/individuos/get.main");

api.route("POST /notes", "packages/functions/src/notes/create.main");
api.route("GET /notes/{id}", "packages/functions/src/notes/get.main");
api.route("GET /notes", "packages/functions/src/notes/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/notes/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/notes/delete.main");