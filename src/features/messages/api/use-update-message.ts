import { useMutation } from "convex/react";

import { api } from "~convex/_generated/api";
import { Id } from "~convex/_generated/dataModel";

import { useApiMutationHook } from "@/hooks/use-api-mutation";

type RequestType = {
  body: string;
  id: Id<"messages">;
};

type ResponseType = Id<"messages"> | null;

export const useUpdateMessage = () => {
  const mutation = useMutation(api.messages.update);

  return useApiMutationHook<RequestType, ResponseType>(mutation);
};
