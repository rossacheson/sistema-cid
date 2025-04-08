# Sistema CID
Una aplicación administrativa. 

Built using SST serverless stack tools.

## Get started
1. Install Angular CLI globally: `npm install -g @angular/cli`
2. Setup environment to run SST
   - Understand the [workflow](https://sst.dev/docs/workflow)
   - Setup your [Credentials](https://sst.dev/docs/iam-credentials) for your development environment
3. Run dev

   ```bash
   npm install
   npx sst dev
   ```
4. Deploy

   ```bash
   npm install
   npx sst deploy
   ```

## Usage

This template uses [npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces).

1. `core/`

   This is for any shared code. It's defined as modules. For example, there's the `Example` module.

   ```ts
   export module Example {
     export function hello() {
       return "Hello, world!";
     }
   }
   ```

   That you can use across other packages using.

   ```ts
   import { Example } from "@aws-monorepo/core/example";

   Example.hello();
   ```

2. `functions/`

   This is for your Lambda functions and it uses the `core` package as a local dependency.

3. `scripts/`

    This is for any scripts that you can run on your SST app using the `sst shell` CLI and [`tsx`](https://www.npmjs.com/package/tsx). For example, you can run the example script using:

   ```bash
   npm run shell src/example.ts
   ```

### Infrastructure

The `infra/` directory contains several files which describe the cloud infrastructure of the application.
                                      