/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sistema-cid",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/storage");
    await import("./infra/web");
    const auth = await import("./infra/auth");
    await import("./infra/api");
    const identityPool = await import("./infra/identity-pool");

    return {
      UserPool: auth.userPool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: identityPool.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
    };
  },
});
