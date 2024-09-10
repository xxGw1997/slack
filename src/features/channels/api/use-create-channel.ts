import { useApiMutationHook } from "@/hooks/use-api-mutation";
import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

type RequestType = { name: string; workspaceId: Id<"workspaces"> };
type ResponseType = Id<"channels"> | null;

export const useCreateChannel = () => {
  const mutation = useMutation(api.channels.create);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
