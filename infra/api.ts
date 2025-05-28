import { notesTable } from "./storage";
import { cidTable} from "./storage";
import { userPool } from "./auth";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [notesTable, cidTable, userPool],
      },
      args: {
        auth: { iam: true }
      },
    }
  }
});

api.route("POST /personas", "packages/functions/src/personas/create.main");
api.route("GET /personas", "packages/functions/src/personas/list.main");
api.route("GET /personas/{id}", "packages/functions/src/personas/get.main");
api.route("PUT /personas/{id}", "packages/functions/src/personas/update.main");
api.route("DELETE /personas/{id}", "packages/functions/src/personas/delete.main");

api.route("POST /aportaciones", "packages/functions/src/aportaciones/create.main");
api.route("GET /aportaciones", "packages/functions/src/aportaciones/list.main");
api.route("GET /aportaciones/{id}", "packages/functions/src/aportaciones/get.main");
// api.route("PUT /aportaciones/{id}", "packages/functions/src/aportaciones/update.main");
// api.route("DELETE /aportaciones/{id}", "packages/functions/src/aportaciones/delete.main");

api.route("POST /notes", "packages/functions/src/notes/create.main");
api.route("GET /notes/{id}", "packages/functions/src/notes/get.main");
api.route("GET /notes", "packages/functions/src/notes/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/notes/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/notes/delete.main");
