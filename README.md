# T3 Stack with tRPC and Effect integration

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` that contains the necessary building blocks for a tRPC and Effect Fullstack application.

## What's changed from the original t3 stack template?
Some files were created and modified to accomodate **Effect**:
- New **lib** folder
  - **runtime-client.ts**: Necessary to run effects on the client side.
  - **runtime-server.ts**: Necessary to run effects on the server side. This file must be updated whenever a new service is introduced.
  - **result.ts**: Types and methods for Result which is the main structure sent by the server. This helps the client to compose a new effect on the client with the errors and data of the server. This is necessary since tRPC serializes the data it sends.
  - **generate-effect.ts**: Methods to transform Result typed data into effects.
  - **services**: All the services used in the application.
  - **schemas**: All the effect schemas used in the application.

**Zod** was also removed in order to introduce **Effect.Schema** as our main validation library.

Within the **server** folder, there's a new folder **helpers** for any effect methods meant to assist any router. In this template, we already introduce a helper method called **with-retry.ts** which retries an **Effect.gen** function whenever it fails. This is to simulate the behavior of **TanStack useQuery** since we're no longer relying on the **TRPCErrors** coming from the server.

## What's next?
You can clone this repo and start using it freely!
