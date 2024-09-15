import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  id: Id<"messages">;
};

type ResponseType = Id<"messages"> | null;

export const useRemoveMessage = () => {
  const mutation = useMutation(api.messages.remove);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
