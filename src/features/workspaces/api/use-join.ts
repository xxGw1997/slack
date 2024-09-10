import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";
import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = { workspaceId: Id<"workspaces">; joinCode: string };
type ResponseType = Id<"workspaces"> | null;

export const useJoin = () => {
  const mutation = useMutation(api.workspaces.join);
  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
