import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";
import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = { workspaceId: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

export const useNewJoinCode = () => {
  const mutation = useMutation(api.workspaces.newJoinCode);
  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
