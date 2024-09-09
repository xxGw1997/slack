import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";
import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = { id: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

export const useRemoveWorkspace = () => {
  const mutation = useMutation(api.workspaces.remove);
  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
