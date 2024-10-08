import { useMutation } from "convex/react";

import { useApiMutationHook } from "@/hooks/use-api-mutation";
import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

export const useCreateWorkspace = () => {
  const mutation = useMutation(api.workspaces.create);
  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
