import type { JsonifiedClient } from "@orpc/openapi-client";
import type { ContractRouterClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { orpcContract } from "../../../../api/src/lib/orpc/contract";

const link = new OpenAPILink(orpcContract, {
  url: "http://localhost:8080",
  // fetch: <-- polyfill fetch if needed
});

const client: JsonifiedClient<ContractRouterClient<typeof orpcContract>> =
  createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
